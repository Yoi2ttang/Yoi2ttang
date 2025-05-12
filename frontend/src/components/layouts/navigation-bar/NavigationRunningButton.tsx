import ShoesIcon from "@/assets/icons/navigation-bar/shoes-icon.svg"
import Link from "next/link"

const NavigationRunningButton = () => {
  return (
    <Link
      href="/running/start"
      className="bg-yoi-500 mb-1.5 flex size-15 flex-col items-center justify-center self-end rounded-full text-white">
      <ShoesIcon />
      <p className="text-xs">러닝</p>
    </Link>
  )
}

export default NavigationRunningButton
