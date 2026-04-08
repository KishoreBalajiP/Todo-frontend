import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface SignupProps {
  onNavigate: (page: "login" | "signup" | "dashboard") => void;
  onToast: (message: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Signup = ({ onNavigate, onToast }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!email || !password || !confirmPassword) {
      onToast("All fields are required", "error");
      return;
    }

    if (password.length < 6) {
      onToast("Password must be at least 6 characters", "error");
      return;
    }

    if (password !== confirmPassword) {
      onToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        onToast(data.message || "Signup failed", "error");
        return;
      }

      onToast("Account created successfully! Please login.", "success");

      // redirect to login after signup
      onNavigate("login");

    } catch (err) {
      console.error("Signup error:", err);
      onToast("Server error during signup", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <CheckCircle className="text-blue-600" size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("login")}
            className="text-blue-600"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;