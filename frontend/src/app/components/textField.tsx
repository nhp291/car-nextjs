import { ReactNode } from "react";

type Props = {
  color?: 'accent' | 'primary' | 'secondary';
  width?: string;
  height?: string;
  loading?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: string) => void;
  className?: string;
  startIcon?: ReactNode;
  label?: string;
  required?: boolean;
}

const COLOR_CLASS: Record<'accent' | 'primary' | 'secondary', string> = {
  accent: 'bg-blue-50 border-blue-400 focus:ring-blue-400',
  primary: 'bg-indigo-50 border-indigo-400 focus:ring-indigo-400',
  secondary: 'bg-gray-100 border-gray-300 focus:ring-gray-300',
};

export const TextField = ({
  color = 'secondary',
  width = '100%',
  height = '44px',
  loading = false,
  placeholder = 'Enter text',
  value = '',
  onChange,
  startIcon,
  className = '',
  label,
  required = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-1" style={{ width }}>
      {label && <label className="text-blue-900 font-semibold mb-1">{label}</label>}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
            {startIcon}
          </span>
        )}
        <input
          type="text"
          className={`pr-4 py-2 w-full rounded-xl border shadow-sm outline-none transition-all duration-200 focus:ring-2 ${COLOR_CLASS[color]} ${className}`}
          style={{ height, paddingLeft: startIcon ? 40 : 16 }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={loading}
          required={required}
        />
        {loading && (
          <span className="absolute right-3 animate-spin">
            {/* Có thể dùng spinner nhỏ nếu muốn */}
          </span>
        )}
      </div>
    </div>
  );
}