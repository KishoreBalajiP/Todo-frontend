import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ToastContainer from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";
import ChangePassword from "./pages/ChangePassword";
import VerifyMfa from "./pages/VerifyMfa";
import SetupMfa from "./pages/SetupMfa"; //NEW IMPORT

const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const { toasts, addToast, removeToast } = useToast();

  const [currentPage, setCurrentPage] = useState<
    | "login"
    | "signup"
    | "dashboard"
    | "change-password"
    | "verify-mfa"
    | "setup-mfa" //NEW PAGE TYPE
  >("login");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setCurrentPage("dashboard");
        } else {
          setCurrentPage("login");
        }

      } catch (err) {

        console.error("Auth check failed:", err);
        setCurrentPage("login");

      } finally {

        setLoading(false);

      }

    };

    checkAuth();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <>
      {currentPage === "login" && (
        <Login
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      {currentPage === "signup" && (
        <Signup
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      {currentPage === "dashboard" && (
        <Dashboard
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      {currentPage === "change-password" && (
        <ChangePassword
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      {currentPage === "verify-mfa" && (
        <VerifyMfa
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      {/* NEW MFA SETUP PAGE */}
      {currentPage === "setup-mfa" && (
        <SetupMfa
          onNavigate={setCurrentPage}
          onToast={addToast}
        />
      )}

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </>
  );
}

export default App;