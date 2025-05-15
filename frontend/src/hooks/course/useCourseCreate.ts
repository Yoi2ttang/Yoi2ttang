import {
  CourseCreateStep,
  CourseData,
  NavigationDirection,
} from "@/types/course.type"
import { Coordinates } from "@/types/map/navermaps"
import { redirect, RedirectType } from "next/navigation"
import { useState } from "react"

const useCourseCreate = () => {
  const [step, setStep] = useState<CourseCreateStep>(CourseCreateStep.START)
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>("forward")

  const [courseData, setCourseData] = useState<CourseData>({
    startLocation: { lat: 0, lng: 0 },
    endLocation: { lat: 0, lng: 0 },
    courseName: "",
    path: [],
    localAddress: "",
    distance: 0,
    image: null,
  })

  const updateCourseData = (data: Partial<CourseData>) => {
    setCourseData((prev) => ({ ...prev, ...data }))
  }

  const updatePath = (path: Coordinates) => {
    setCourseData((prev) => ({ ...prev, path: [...prev.path, path] }))
  }

  const handleNextStep = async () => {
    switch (step) {
      case CourseCreateStep.END:
        redirect("/course", "replace" as RedirectType)
      case CourseCreateStep.SEARCH:
        setNavigationDirection("backward")
        setStep(CourseCreateStep.START)
        window.history.pushState(null, "", `?step=${CourseCreateStep.START}`)
        break
      case CourseCreateStep.CONFIRM:
        await handleSubmit()
        break
      default:
        setNavigationDirection("forward")
        setStep(step + 1)
        window.history.pushState(null, "", `?step=${step + 1}`)
    }
  }

  const handlePrevStep = () => {
    if (step === CourseCreateStep.START) {
      redirect("/course", "replace" as RedirectType)
    }

    setNavigationDirection("backward")
    setStep(step - 1)
    window.history.pushState(null, "", `?step=${step - 1}`)
  }

  const handleSubmit = async () => {
    console.log(courseData)
  }

  const handleSearchStep = () => {
    setNavigationDirection("forward")
    setStep(CourseCreateStep.SEARCH)
    window.history.pushState(null, "", `?step=${CourseCreateStep.SEARCH}`)
  }

  return {
    step,
    setStep,
    navigationDirection,
    courseData,
    updateCourseData,
    updatePath,
    handleNextStep,
    handlePrevStep,
    handleSearchStep,
  }
}

export default useCourseCreate
