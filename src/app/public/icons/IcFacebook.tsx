import { SizeImage } from "@/app/constants/types/HomeType";

export const IcFacebook = ({ width, height }: SizeImage) => {
  return (
    <div style={{ width, height }}>
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="23.9998" r="24" fill="#3B3C98" />
        <g clipPath="url(#clip0_1_1631)">
          <path d="M27.9973 15.985H30.1883V12.169C29.8103 12.117 28.5103 12 26.9963 12C23.8373 12 21.6733 13.987 21.6733 17.639V21H18.1873V25.266H21.6733V36H25.9473V25.267H29.2923L29.8233 21.001H25.9463V18.062C25.9473 16.829 26.2793 15.985 27.9973 15.985Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_1_1631">
            <rect width="24" height="24" fill="white" transform="translate(12 11.9998)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}