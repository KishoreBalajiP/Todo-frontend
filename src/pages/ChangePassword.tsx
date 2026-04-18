import { useState } from "react";
import { Eye, EyeOff, Loader2, KeyRound } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
  onToast: (msg: string, type: "success" | "error") => void;
  onNavigate: (page: "login" | "signup" | "dashboard" | "change-password") => void;
}

const ChangePassword = ({ onToast, onNavigate }: Props) => {

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      return onToast("Please fill all fields", "error");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            oldPassword,
            newPassword
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return onToast(data.message, "error");
      }

      onToast("Password updated successfully ", "success");

      onNavigate("login");

    } catch {
      onToast("Server error", "error");
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
            <KeyRound className="text-blue-600" size={30} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your email and update your password securely
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Old Password */}
          <div>
            <label className="text-sm text-gray-600">Old Password</label>

            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Enter old password"
                value={oldPassword}
                disabled={loading}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showOld ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-600">New Password</label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                disabled={loading}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showNew ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Remember your password?{" "}
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
};

export default ChangePassword;