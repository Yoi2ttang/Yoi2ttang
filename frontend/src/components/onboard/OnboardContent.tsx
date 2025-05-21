"use client"

import CourseImage1 from "@/assets/images/onboard/course_1.png"
import CourseImage2 from "@/assets/images/onboard/course_2.png"
import DashBoardImage1 from "@/assets/images/onboard/dashboard_1.png"
import DashBoardImage2 from "@/assets/images/onboard/dashboard_2.png"
import ProfileImage1 from "@/assets/images/onboard/profile_1.png"
import ProfileImage2 from "@/assets/images/onboard/profile_2.png"
import RunningImage1 from "@/assets/images/onboard/running_1.png"
import RunningImage2 from "@/assets/images/onboard/running_2.png"
import Button from "@/components/common/Button"
import Carousel from "@/components/common/Carousel"
import OnboardCarouselItem from "@/components/onboard/OnboardCarouselItem"
import OnboardCarouselStartItem from "@/components/onboard/OnboardCarouselStartItem"
import { useRouter } from "next/navigation"

const OnboardContent = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/login")
  }

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Carousel scrollCount={5}>
          <OnboardCarouselStartItem />
          <OnboardCarouselItem
            title={
              <p>
                러닝에 <span className="text-yoi-500">재미</span>와{" "}
                <span className="text-yoi-500">성취감</span>을 더하다
              </p>
            }
            description="#타일 점령 #랭킹 시스템"
            image1={RunningImage2}
            image2={RunningImage1}
          />
          <OnboardCarouselItem
            title={
              <p>
                <span className="text-yoi-500">나</span>와{" "}
                <span className="text-yoi-500">팀</span>의 활동을 한눈에
              </p>
            }
            description="#개인/팀별 현황판"
            image1={DashBoardImage2}
            image2={DashBoardImage1}
          />

          <OnboardCarouselItem
            title="다양한 여정을 떠나봐요"
            description="#나의 코스 #코스 생성"
            image1={CourseImage2}
            image2={CourseImage1}
          />
          <OnboardCarouselItem
            title="다른 러너가 궁금하다면"
            description="#러너 프로필"
            image1={ProfileImage2}
            image2={ProfileImage1}
            className="mr-0 ml-6"
          />
        </Carousel>
      </div>

      <div className="px-4 pb-6">
        <Button className="w-full" onClick={handleClick}>
          지금 바로 달려들기!
        </Button>
      </div>
    </div>
  )
}

export default OnboardContent
