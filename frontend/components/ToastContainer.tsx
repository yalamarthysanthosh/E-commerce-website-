import React, { createContext, useState, useContext, useCallback, ReactNode, useMemo, useEffect } from 'react';
import { CheckCircleIcon, InfoIcon } from './Icons';

// --- Types and Context ---

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  emoji?: string;
}

interface ToastContextType {
  addToast: (message: string, options?: { type?: ToastType, emoji?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// --- Toast Component ---

interface ToastProps {
  toast: ToastMessage;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300); // Wait for exit animation
    }, 4700);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Allow animation to finish
  };
  
  const icons = useMemo(() => ({
      success: <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />,
      info: <InfoIcon className="w-6 h-6 text-cyan-400 flex-shrink-0" />,
      warning: <InfoIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />,
      error: <InfoIcon className="w-6 h-6 text-red-400 flex-shrink-0" />,
  }), []);


  return (
    <div 
      className={`flex items-start p-4 rounded-lg shadow-lg bg-slate-800 border border-cyan-500/30 w-full ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="mr-3 mt-0.5">
        {toast.emoji ? (
          <span className="text-2xl">{toast.emoji}</span>
        ) : (
          icons[toast.type]
        )}
      </div>
      <p className="flex-1 text-slate-200 text-sm leading-relaxed">{toast.message}</p>
      <button 
        onClick={handleClose} 
        className="ml-4 -mr-1 -mt-1 p-1 text-slate-400 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// --- ToastContainer Component ---

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-xs">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// --- ToastProvider ---
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, options: { type?: ToastType, emoji?: string } = {}) => {
    const { type = 'info', emoji } = options;
    const id = Date.now() + Math.random();
    setToasts(prevToasts => [...prevToasts, { id, message, type, emoji }]);
  }, []);
  
  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
