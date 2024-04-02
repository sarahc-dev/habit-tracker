import Image from "next/image"
import { PiUserCircleLight } from "react-icons/pi"

export default function Avatar({
  image,
  isDesktop,
}: {
  image: string | null | undefined
  isDesktop: boolean
}) {
  return (
    <div className={`${isDesktop && "mb-3 mt-8"}`}>
      {image ? (
        <Image
          src={image}
          alt="user avatar"
          height={isDesktop ? 64 : 32}
          width={isDesktop ? 64 : 32}
          className="rounded-full"
        />
      ) : (
        // <PiUserCircleLight size={isDesktop ? "4rem" : "2rem"} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width=""
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`${isDesktop && "h-16 w-16"}`}
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      )}
    </div>
  )
}
