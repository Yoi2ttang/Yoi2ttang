import HeaderWrapper from "@/components/layouts/Header/HeaderWrapper"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {}

const MainHeader = ({}: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Link className="" href="/">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="object-contain py-2"
        />
      </Link>
    </HeaderWrapper>
  )
}

export default MainHeader
