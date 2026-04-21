import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleVerify}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          Enter Authentication Code
        </h2>

        <input
          type="text"
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Verify"}
        </button>

      </form>

    </div>
  );
} 