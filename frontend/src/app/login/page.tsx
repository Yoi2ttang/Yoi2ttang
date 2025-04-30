import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import Button from "@/components/common/Button"
import Image from "next/image"

const LoginPage = () => {
  return (
    <div className="flex h-dvh flex-col justify-center px-6 pb-6">
      <div className="flex flex-1 flex-col justify-evenly">
        <p className="text-title-lg">
          뛰어서 땅따먹기
          <br />
          너의 <span className="text-yoi-500">간지</span>를 보여줘!
        </p>

        <div className="flex justify-center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={46}
            height={34}
            className="w-56"
          />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm text-neutral-400">
            SNS 계정으로 간편하게 로그인 하세요
          </p>

          <Button className="bg-kakao-yellow flex items-center gap-4">
            <KakaoIcon />
            <p className="text-kakao-brown text-lg">카카오로 달려들기</p>
          </Button>
        </div>

        <p className="text-caption text-center text-neutral-200">
          ⓒ 2025. Yoittang All rights reserved
        </p>
      </div>
    </div>
  )
}

export default LoginPage
