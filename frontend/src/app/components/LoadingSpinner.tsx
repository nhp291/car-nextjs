'use client';
import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'white' | 'blue';
    text?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    size = 'md',
    color = 'primary',
    text = 'Đang tải...',
    fullScreen = false
}: LoadingSpinnerProps) {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colorClasses = {
        primary: 'border-blue-600',
        white: 'border-white',
        blue: 'border-blue-500'
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-current rounded-full animate-spin ${colorClasses[color]}`}></div>
            {text && (
                <div className="text-center">
                    <p className={`text-sm font-medium ${color === 'white' ? 'text-white' : 'text-blue-600'}`}>
                        {text}{dots}
                    </p>
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
}

// Variant components for different use cases
export function PageLoader() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-bold text-indigo-900 mb-2">Car Next.js</h2>
                <p className="text-blue-700/80">Đang tải trang...</p>
            </div>
        </div>
    );
}

export function CardLoader() {
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
        </div>
    );
}

export function TableLoader() {
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="animate-pulse">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                            <div className="w-20 h-6 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ButtonLoader() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Đang xử lý...</span>
        </div>
    );
} 