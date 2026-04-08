import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ToastContainer from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";

const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const { toasts, addToast, removeToast } =
    useToast();

  const [currentPage, setCurrentPage] = useState<
    "login" | "signup" | "dashboard"
  >("login");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch(
          `${API_URL}/api/auth/me`,
          { credentials: "include" }
        );

        if (res.ok)
          setCurrentPage("dashboard");

        else
          setCurrentPage("login");

      } catch {
        setCurrentPage("login");
      }

      setLoading(false);
    };

    checkAuth();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </>
  );
}

export default App;