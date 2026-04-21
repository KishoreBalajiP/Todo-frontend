import { useState } from "react";
import { Loader2 } from "lucide-react";

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

  // QR stored from Dashboard after calling /mfa/setup
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
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleVerifySetup}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >

        <h2 className="text-xl font-bold mb-4 text-center">
          Setup Multi-Factor Authentication
        </h2>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Scan this QR code using Google Authenticator
        </p>

        {qrCode ? (
          <img
            src={qrCode}
            alt="MFA QR"
            className="mx-auto mb-4"
          />
        ) : (
          <p className="text-red-500 text-sm text-center mb-4">
            QR code not found. Restart setup.
          </p>
        )}

        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 6)
            )
          }
          className="border w-full p-2 rounded mb-4"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded flex justify-center items-center"
        >
          {loading
            ? <Loader2 className="animate-spin" />
            : "Verify & Enable MFA"}
        </button>

      </form>

    </div>
  );
}