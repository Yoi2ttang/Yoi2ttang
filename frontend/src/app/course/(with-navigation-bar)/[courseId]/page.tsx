import FireIcon from "@/assets/icons/course/fire-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import TimeIcon from "@/assets/icons/profile/time-icon.svg"
import TempMapImage from "@/assets/images/course/temp_map.png"
import KakaoProfileImage from "@/assets/images/profile/kakao_profile.jpg"
import Button from "@/components/common/Button"
import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import Image from "next/image"
import Link from "next/link"

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { courseId } = await params

  return (
    <div>
      <StackHeader title="코스 상세" />

      <div>
        <div className="relative h-72 w-full">
          <Image src={TempMapImage} alt="" fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Section title="한강 러닝 코스" className="rounded-xl bg-white p-4">
            <div className="flex flex-col gap-2">
              <div className="text-yoi-500 text-title-sm flex items-center gap-3">
                <RouteIcon className="size-6" />
                <p className="w-24">거리</p>
                <p className="font-normal text-black">10km</p>
              </div>

              <div className="text-yoi-500 text-title-sm flex items-center gap-3">
                <FireIcon className="size-6" />
                <p className="w-24">칼로리</p>
                <p className="font-normal text-black">300kcal</p>
              </div>

              <div className="text-yoi-500 text-title-sm flex items-center gap-3">
                <TimeIcon className="size-6" />
                <p className="w-24">소요 시간</p>
                <p className="font-normal text-black">약 73분</p>
              </div>
            </div>
          </Section>

          <Section
            title="코스 완주 러너"
            className="w-full rounded-xl bg-white p-4">
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
                  <p className="text-caption line-clamp-1 break-all">
                    호랑이12345
                  </p>
                </Link>
              ))}
            </Carousel>
          </Section>

          <Button className="w-full">참여하기</Button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
