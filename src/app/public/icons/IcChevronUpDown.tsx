import { SizeImage } from "@/app/constants/types/HomeType";

export const IcChevronUpDown = ({ width, height }: SizeImage) => {
  return (
    <div style={{ width, height }}>
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    </div>
  )
}