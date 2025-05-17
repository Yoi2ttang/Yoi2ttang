"use client"

import StackAnimated from "@/components/animated/StackAnimated"
import Loading from "@/components/common/Loading"
import CourseCreateConfirmContainer from "@/components/course/course-create/confirm/CourseCreateConfirmContainer"
import CourseCreateButton from "@/components/course/course-create/CourseCreateButton"
import CourseCreateEndContainer from "@/components/course/course-create/CourseCreateEndContainer"
import CourseCreateDrawContainer from "@/components/course/course-create/draw/CourseCreateDrawContainer"
import CourseCreateAddNameContainer from "@/components/course/course-create/name/CourseCreateAddNameContainer"
import CourseCreateSearchContainer from "@/components/course/course-create/search/CourseCreateSearchContainer"
import CourseCreateStartContainer from "@/components/course/course-create/start/CourseCreateStartContainer"
import useCourseCreate from "@/hooks/course/useCourseCreate"
import { CourseCreateStep, StepConfig } from "@/types/course.type"
import { Suspense } from "react"
interface CourseCreatePageProps {}

const stepConfigurations: Record<CourseCreateStep, StepConfig> = {
  [CourseCreateStep.START]: {
    title: "출발지 설정하기",
    buttonText: "출발지 설정 완료",
  },
  [CourseCreateStep.DRAW]: {
    title: "경로 그리기",
    buttonText: "경로 그리기 완료",
  },
  [CourseCreateStep.SEARCH]: {
    title: "검색하기",
    buttonText: "완료",
  },
  [CourseCreateStep.NAME]: {
    title: "코스 이름 정하기",
    buttonText: "이름 설정 완료",
  },
  [CourseCreateStep.CONFIRM]: {
    title: "코스 확인하기",
    buttonText: "저장하기",
  },
  [CourseCreateStep.END]: {
    title: "코스 생성 완료",
    buttonText: "달리러 가기",
  },
}

const CourseCreatePage = ({}: CourseCreatePageProps) => {
  const {
    drawMapRef,
    isSearch,
    step,
    setStep,
    navigationDirection,
    courseData,
    updateCourseData,
    updatePath,
    handleNextStep,
    handlePrevStep,
    handleSearchStep,
  } = useCourseCreate()

  const buttonDisableHandler = () => {
    // true 일 때 버튼 비활성화
    switch (step) {
      case CourseCreateStep.START:
        return false
      case CourseCreateStep.DRAW:
        return courseData.path.length < 2
      case CourseCreateStep.SEARCH:
        return courseData.startLocation?.lat === 0
      case CourseCreateStep.NAME:
        return courseData.courseName.length === 0
      case CourseCreateStep.CONFIRM:
        return false
      case CourseCreateStep.END:
        return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case CourseCreateStep.START:
        return (
          <CourseCreateStartContainer
            isSearch={isSearch}
            courseData={courseData}
            title={stepConfigurations[step].title}
            onBack={handlePrevStep}
            handleSearchStep={handleSearchStep}
            updateCourseData={updateCourseData}
          />
        )
      case CourseCreateStep.DRAW:
        return (
          <CourseCreateDrawContainer
            drawMapRef={drawMapRef}
            step={step}
            path={courseData.path}
            courseData={courseData}
            title={stepConfigurations[step].title}
            onPrevStep={handlePrevStep}
            updateCourseData={updateCourseData}
            updatePath={updatePath}
          />
        )
      case CourseCreateStep.SEARCH:
        return (
          <CourseCreateSearchContainer
            title={stepConfigurations[step].title}
            onPrevStep={() => setStep(CourseCreateStep.START)}
            updateCourseData={updateCourseData}
          />
        )
      case CourseCreateStep.NAME:
        return (
          <CourseCreateAddNameContainer
            courseData={courseData}
            title={stepConfigurations[step].title}
            onPrevStep={handlePrevStep}
            updateCourseData={updateCourseData}
          />
        )
      case CourseCreateStep.CONFIRM:
        return (
          <CourseCreateConfirmContainer
            imageUrl={courseData.imageUrl}
            courseName={courseData.courseName}
            onPrevStep={handlePrevStep}
          />
        )
      case CourseCreateStep.END:
        return <CourseCreateEndContainer />
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <StackAnimated<CourseCreateStep>
        step={step}
        direction={navigationDirection}>
        <div className="relative h-dvh w-full">
          {renderStep()}
          {step !== CourseCreateStep.END && (
            <CourseCreateButton
              disabled={buttonDisableHandler()}
              buttonText={stepConfigurations[step].buttonText ?? ""}
              onClick={handleNextStep}
            />
          )}
        </div>
      </StackAnimated>
    </Suspense>
  )
}
export default CourseCreatePage
