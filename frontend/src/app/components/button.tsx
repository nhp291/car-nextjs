'use client';

import { IcSpinner } from '@/components/icons/IcSpinner';

type ButtonProps = {
    color?: 'accent' | 'primary' | 'secondary';
    width?: string;
    height?: string;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

const COLOR_CLASS: Record<NonNullable<ButtonProps['color']>, string> = {
    accent: 'bg-blue-600 hover:bg-blue-700 text-white',
    primary: 'bg-indigo-700 hover:bg-indigo-800 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
};

export const Button = ({
    width = '100%',
    height = '44px',
    color = 'accent',
    loading = false,
    disabled = false,
    children,
    onClick,
    className = '',
    type = 'button',
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`relative flex items-center justify-center font-semibold rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed ${COLOR_CLASS[color]} ${className}`}
            style={{ width, height }}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading && (
                <span className="absolute left-4 animate-spin">
                    <IcSpinner width="24px" height="24px" />
                </span>
            )}
            <span className={loading ? 'opacity-60 ml-6' : ''}>{children}</span>
        </button>
    );
};
