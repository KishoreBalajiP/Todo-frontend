import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

const SubscribeModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/payment/create-order`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const order = await res.json();

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "TaskFlow Premium",
        description: "Unlimited Tasks Unlock",
        order_id: order.id,

        handler: async (response: any) => {
          await fetch(
            `${API_URL}/api/payment/verify-payment`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          alert("Premium activated successfully 🎉");
          window.location.reload();
        },

        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold mb-3">
          Upgrade to Premium
        </h2>

        <p className="mb-4">
          Unlock unlimited tasks for ₹49
        </p>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>

        <button
          onClick={onClose}
          className="ml-3"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default SubscribeModal;