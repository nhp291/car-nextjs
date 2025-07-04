import { SizeImage } from "@/app/constants/types/HomeType";

export const IcMagnifying = ({ width, height }: SizeImage) => {
  return (
    <div style={{ width, height }}>
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="white" />
        <path d="M28 28L24.1333 24.1333M26.2222 19.1111C26.2222 23.0385 23.0385 26.2222 19.1111 26.2222C15.1838 26.2222 12 23.0385 12 19.1111C12 15.1838 15.1838 12 19.1111 12C23.0385 12 26.2222 15.1838 26.2222 19.1111Z" stroke="url(#paint0_linear_1_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="paint0_linear_1_2" x1="4.76191" y1="9.71428" x2="48.9524" y2="39.0476" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5D5FC0" />
            <stop offset="1" stopColor="#FFD2CC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}