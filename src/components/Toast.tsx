import { Toast as ToastType } from '../hooks/useToast';
import { X, CheckCircle, AlertCircle, InfoIcon, AlertTriangle } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <InfoIcon size={20} />,
  };

  return (
    <div className={`${colors[toast.type]} text-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-80`}>
      {icons[toast.type]}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="hover:opacity-80 transition-opacity"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;