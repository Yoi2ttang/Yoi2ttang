import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import Image from "next/image"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="flex h-dvh flex-col justify-center p-6">
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

        <div className="flex flex-col gap-2">
          <p className="text-center text-sm text-neutral-400">
            SNS 계정으로 간편하게 로그인 하세요
          </p>

          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
            className="bg-kakao-yellow flex items-center justify-center gap-4 rounded-xl px-5 py-3">
            <KakaoIcon />
            <p className="text-kakao-brown text-lg">카카오로 달려들기</p>
          </Link>
        </div>
      </div>

      <p className="text-caption text-center text-neutral-300">
        ⓒ 2025. Yoittang All rights reserved
      </p>
    </div>
  )
}

export default LoginPage
