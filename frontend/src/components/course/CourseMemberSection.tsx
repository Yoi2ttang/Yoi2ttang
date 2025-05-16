import KakaoProfileImage from "@/assets/images/profile/kakao_profile.jpg"
import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"

import Image from "next/image"
import Link from "next/link"
import ViewMoreFinishersButton from "./ViewMoreFinishersButton"

interface CourseMemberSectionProps {}

const CourseMemberSection = () => {
  return (
    <Section
      title="코스 완주 러너"
      supplement={<ViewMoreFinishersButton />}
      className="w-full rounded-xl bg-white p-6">
      <Carousel dragFree={true} skipSnaps={false}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Link
            key={index}
            href={`/profile/${index}`}
            className="flex w-20 shrink-0 flex-col items-center gap-1">
            <div className="relative size-12">
              <Image
                src={KakaoProfileImage}
                alt=""
                fill
                className="order rounded-full border-neutral-200"
              />
            </div>
            <p className="text-caption line-clamp-1 break-all">호랑이12345</p>
          </Link>
        ))}
      </Carousel>
    </Section>
  )
}

export default CourseMemberSection
