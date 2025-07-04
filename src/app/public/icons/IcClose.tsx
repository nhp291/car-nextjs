import { SizeImage } from "@/app/constants/types/HomeType";

export const IcClose = ({ width, height }: SizeImage) => {
  return (
    <div style={{ width, height }}>
      <svg x="0px" y="0px" viewBox="0 0 24 24">
        <path fill="#000"
          d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z">
        </path>
      </svg>
    </div>
  )
}