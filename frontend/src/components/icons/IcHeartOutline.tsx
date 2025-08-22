import { SizeImage } from "@/app/constants/types/HomeType";

export const IcHeartOutline = ({ width, height }: SizeImage) => {
    return (
        <div style={{ width, height }}>
            <svg viewBox="0 0 24 24" fill="none">
                <path
                    d="M21 8.25C21 5 18.964 3 16.5 3C14.036 3 12 5 12 8.25C12 5 9.964 3 7.5 3C5.036 3 3 5 3 8.25C3 15 12 21 12 21C12 21 21 15 21 8.25Z"
                    stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
};