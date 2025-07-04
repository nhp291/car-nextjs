import { SizeImage } from "@/app/constants/types/HomeType";

export const IcArrowRight = ({ width, height }: SizeImage) => {
  return (
    <div style={{ width, height }}>
      <svg viewBox="0 0 30 30" fill="none">
        <g opacity="0.3">
          <path d="M20 0H10C4.47715 0 0 4.47715 0 10V20C0 25.5228 4.47715 30 10 30H20C25.5228 30 30 25.5228 30 20V10C30 4.47715 25.5228 0 20 0Z" fill="white" />
        </g>
        <path d="M9.1667 15H20.8334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.6667 10.8331L20.8334 14.9998L16.6667 19.1665" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}