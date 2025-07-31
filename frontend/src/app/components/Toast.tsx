'use client';
import { useEffect, useState } from 'react';
import { IcClose } from '@/app/public/icons/IcClose';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

const toastIcons = {
    success: (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
    )
};

const toastStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export default function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
        >
            <div className={`border rounded-lg shadow-lg p-4 ${toastStyles[type]}`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {toastIcons[type]}
                    </div>
                    <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium">{title}</h3>
                        {message && (
                            <p className="mt-1 text-sm opacity-90">{message}</p>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(() => onClose(id), 300);
                            }}
                            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                        >
                            <IcClose className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Toast Container to manage multiple toasts
interface ToastContainerProps {
    toasts: Array<{
        id: string;
        type: ToastType;
        title: string;
        message?: string;
        duration?: number;
    }>;
    onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}

// Toast Hook for easy usage
export function useToast() {
    const [toasts, setToasts] = useState<Array<{
        id: string;
        type: ToastType;
        title: string;
        message?: string;
        duration?: number;
    }>>([]);

    const addToast = (type: ToastType, title: string, message?: string, duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, type, title, message, duration }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (title: string, message?: string, duration?: number) => {
        addToast('success', title, message, duration);
    };

    const error = (title: string, message?: string, duration?: number) => {
        addToast('error', title, message, duration);
    };

    const warning = (title: string, message?: string, duration?: number) => {
        addToast('warning', title, message, duration);
    };

    const info = (title: string, message?: string, duration?: number) => {
        addToast('info', title, message, duration);
    };

    return {
        toasts,
        removeToast,
        success,
        error,
        warning,
        info
    };
} 