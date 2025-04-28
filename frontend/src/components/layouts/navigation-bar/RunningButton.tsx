import ShoesIcon from "@/assets/icons/navigation-bar/shoes-icon.svg"
import Link from "next/link"

const RunningButton = () => {
  return (
    <Link
      href="/running/start"
      className="flex flex-col items-center self-end justify-center mb-1.5 text-white bg-orange-600 rounded-full size-15">
      <ShoesIcon />
      <p className="text-xs">러닝</p>
    </Link>
  )
}

export default RunningButton
