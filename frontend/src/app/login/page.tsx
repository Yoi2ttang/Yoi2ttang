import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import Button from "@/components/common/Button"
import Image from "next/image"

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center px-6 pb-6 h-dvh">
      <div className="flex flex-col flex-1 justify-evenly">
        <p className="text-title-lg">
          뛰어서 땅따먹기
          <br />
          너의 <span className="text-yoi-500">간지</span>를 보여줘!
        </p>

        <div className="flex justify-end">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={184}
            height={136}
            className="opacity-20"
          />
          <Image src="/images/logo.svg" alt="logo" width={184} height={136} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-center text-neutral-400">
            SNS 계정으로 간편하게 로그인 하세요
          </p>

          <Button className="flex items-center gap-4 bg-kakao-yellow">
            <KakaoIcon />
            <p className="text-lg text-kakao-brown">카카오로 달려들기</p>
          </Button>
        </div>

        <p className="text-center text-caption text-neutral-200">
          ⓒ 2025. Yoittang All rights reserved
        </p>
      </div>
    </div>
  )
}

export default LoginPage
