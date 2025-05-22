import HeaderWrapper from "@/components/layouts/Header/HeaderWrapper"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {}

const MainHeader = ({}: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Link href="/dashboard/my">
        <Image
          src="/images/logo-title.svg"
          alt="logo"
          width={120}
          height={50}
          className="object-contain py-2"
        />
      </Link>
    </HeaderWrapper>
  )
}

export default MainHeader
