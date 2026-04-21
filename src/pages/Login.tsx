import { useState } from "react";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

interface LoginProps {
  onNavigate: (
    page:
      | "login"
      | "signup"
      | "dashboard"
      | "change-password"
      | "verify-mfa"
  ) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ onNavigate, onToast }: LoginProps) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);


  // ===============================
  // FORM VALIDATION
  // ===============================
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
      onToast("Password must be at least 6 characters", "error");
      return false;
    }

    return true;
  };


  // ===============================
  // EMAIL LOGIN
  // ===============================
  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await loginRes.json();

      if (!loginRes.ok) {
        onToast(data.message || "Invalid credentials", "error");
        return;
      }

      // ===============================
      // NEW: MFA CHECK
      // ===============================
      if (data.mfaRequired) {

        sessionStorage.setItem("mfaUserId", data.userId);

        onNavigate("verify-mfa");

        return;
      }

      // ===============================
      // SESSION VALIDATION
      // ===============================
      const sessionCheck = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!sessionCheck.ok) {
        onToast("Session verification failed", "error");
        return;
      }

      onToast("Welcome back", "success");

      onNavigate("dashboard");

    } catch (err) {

      console.error(err);

      onToast("Unable to connect to server", "error");

    } finally {

      setLoading(false);

    }
  };


  // ===============================
  // GOOGLE LOGIN
  // ===============================
  const handleGoogleSuccess = async (credentialResponse: any) => {

    try {

      setLoading(true);

      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        onToast(data.message || "Google login failed", "error");
        return;
      }

      // ===============================
      // NEW: MFA CHECK
      // ===============================
      if (data.mfaRequired) {

        sessionStorage.setItem("mfaUserId", data.userId);

        onNavigate("verify-mfa");

        return;
      }

      onToast("Logged in with Google", "success");

      onNavigate("dashboard");

    } catch (err) {

      console.error(err);

      onToast("Google login failed", "error");

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-3 rounded-full">
            <CheckCircle className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          TaskFlow
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue managing your tasks
        </p>


        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>

            <input
              type="email"
              autoComplete="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>


          {/* Password */}
          <div>

            <label className="text-sm text-gray-600">Password</label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword
                  ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

          </div>


          {/* Remember me */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                disabled={loading}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() => onNavigate("change-password")}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>

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

            {loading
              ? "Signing in..."
              : "Sign in"}

          </button>

        </form>


        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>


        {/* Google Login Button */}
        <div className="flex justify-center">

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              onToast("Google Sign-in failed", "error");
            }}
          />

        </div>


        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">

          Don’t have an account?{" "}

          <button
            onClick={() => onNavigate("signup")}
            className="text-blue-600 font-medium hover:underline"
          >
            Create account
          </button>

        </p>

      </div>

    </div>
  );
};

export default Login;