import HeaderWrapper from "@/components/layout/Header/HeaderWrapper"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {}

const MainHeader = ({}: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={45}
          height={45}
          className="w-full"
        />
      </Link>
    </HeaderWrapper>
  )
}

export default MainHeader
