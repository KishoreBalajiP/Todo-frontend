import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

interface Props {
  onNavigate: (page: "login" | "dashboard") => void;
  onToast: (msg: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function VerifyMfa({ onNavigate, onToast }: Props) {

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {

    e.preventDefault();

    const userId = sessionStorage.getItem("mfaUserId");

    if (!userId) {
      onToast("Session expired. Login again.", "error");
      onNavigate("login");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${API_URL}/auth/mfa/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          token: code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        onToast(data.message || "Invalid code", "error");
        return;
      }

      sessionStorage.removeItem("mfaUserId");

      onToast("Login successful", "success");

      onNavigate("dashboard");

    } catch (err) {

      console.error(err);

      onToast("Verification failed", "error");

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
          Verify Authentication
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit code from your authenticator app
        </p>


        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">
              Authentication Code
            </label>

            <input
              type="text"
              maxLength={6}
              value={code}
              disabled={loading}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >

            {loading && (
              <Loader2 className="animate-spin" size={18} />
            )}

            {loading ? "Verifying..." : "Verify Code"}

          </button>

        </form>


        {/* Back to login */}
        <p className="text-center mt-6 text-sm text-gray-600">

          Didn’t receive a code?{" "}

          <button
            onClick={() => onNavigate("login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Back to login
          </button>

        </p>

      </div>

    </div>
  );
}