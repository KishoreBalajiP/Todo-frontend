import { useState } from "react";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

interface SignupProps {
  onNavigate: (page: "login" | "signup" | "dashboard") => void;
  onToast: (message: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Signup = ({ onNavigate, onToast }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      onToast("Email is required", "error");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      onToast("Enter a valid email address", "error");
      return false;
    }

    if (!password) {
      onToast("Password is required", "error");
      return false;
    }

    if (password.length < 6) {
      onToast(
        "Password must be at least 6 characters",
        "error"
      );
      return false;
    }

    if (password !== confirmPassword) {
      onToast("Passwords do not match", "error");
      return false;
    }

    return true;
  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        onToast(
          data.message || "Signup failed",
          "error"
        );
        return;
      }

      onToast(
        "Account created successfully",
        "success"
      );

      onNavigate("login");
    } catch (err) {
      console.error(err);
      onToast(
        "Unable to connect to server",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength =
    password.length >= 10
      ? "strong"
      : password.length >= 6
      ? "medium"
      : "weak";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-3 rounded-full">
            <CheckCircle
              className="text-blue-600"
              size={32}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Start managing your tasks smarter today
        </p>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              type="email"
              autoComplete="email"
              disabled={loading}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                autoComplete="new-password"
                disabled={loading}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Strength Indicator (ONLY after typing) */}
            {password.length > 0 && (
              <p
                className={`text-xs mt-1 ${
                  passwordStrength === "strong"
                    ? "text-green-600"
                    : passwordStrength === "medium"
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                Password strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                disabled={loading}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
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
              ? "Creating account..."
              : "Sign up"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() =>
              onNavigate("login")
            }
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;