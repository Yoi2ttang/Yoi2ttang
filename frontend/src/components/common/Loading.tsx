import TileLoading from "@/assets/images/loading/tile-loading.gif"
import Image from "next/image"

interface LoadingProps {}

const Loading = ({}: LoadingProps) => {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Image src={TileLoading} alt="logo" width={120} height={120} />
    </div>
  )
}
export default Loading
