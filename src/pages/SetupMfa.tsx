import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

interface Props {
  onNavigate: (
    page:
      | "login"
      | "signup"
      | "dashboard"
      | "change-password"
      | "verify-mfa"
      | "setup-mfa"
  ) => void;
  onToast: (msg: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function SetupMfa({
  onNavigate,
  onToast,
}: Props) {

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const qrCode = sessionStorage.getItem("mfaQr");

  const handleVerifySetup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!code) {
      onToast("Enter verification code", "error");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${API_URL}/auth/mfa/verify-setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            token: code,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        onToast(
          data.message || "Invalid verification code",
          "error"
        );
        return;
      }

      sessionStorage.removeItem("mfaQr");

      onToast(
        "MFA enabled successfully 🎉",
        "success"
      );

      onNavigate("dashboard");

    } catch (err) {

      console.error(err);

      onToast(
        "Verification failed. Try again.",
        "error"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-3 rounded-full">
            <ShieldCheck className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Enable Two-Factor Authentication
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Scan the QR code using Google Authenticator or any OTP app
        </p>


        {/* QR Code */}
        {qrCode ? (
          <div className="flex justify-center mb-6">
            <img
              src={qrCode}
              alt="MFA QR"
              className="rounded-lg border p-2 shadow-sm"
            />
          </div>
        ) : (
          <p className="text-red-500 text-sm text-center mb-4">
            QR code not found. Restart setup.
          </p>
        )}


        {/* Form */}
        <form
          onSubmit={handleVerifySetup}
          className="space-y-4"
        >

          <div>
            <label className="text-sm text-gray-600">
              Enter verification code
            </label>

            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              value={code}
              disabled={loading}
              onChange={(e) =>
                setCode(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>


          {/* Submit */}
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >

            {loading && (
              <Loader2
                className="animate-spin"
                size={18}
              />
            )}

            {loading
              ? "Verifying..."
              : "Verify & Enable MFA"}

          </button>

        </form>


        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">

          Changed your mind?{" "}

          <button
            onClick={() =>
              onNavigate("dashboard")
            }
            className="text-blue-600 font-medium hover:underline"
          >
            Go back to dashboard
          </button>

        </p>

      </div>

    </div>
  );
}