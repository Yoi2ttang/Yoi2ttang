import Image from "next/image"
import TileLoading from "@/assets/images/loading/tile-loading.gif"

const LoginAuthPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Image src={TileLoading} alt="logo" width={120} height={120} />
        <p className="text-yoi-500 animate-pulse font-semibold">
          로그인을 하는 중이에요
        </p>
      </div>

      <div className="flex justify-center">
        <Image src="/images/logo.svg" alt="logo" width={46} height={34} />
      </div>
    </div>
  )
}

export default LoginAuthPage
