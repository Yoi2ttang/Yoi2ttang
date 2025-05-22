"use client"

import { createCourse } from "@/services/course/api"
import {
  CourseCreateStep,
  CourseData,
  NavigationDirection,
} from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import domtoimage from "dom-to-image-more"
import {
  redirect,
  RedirectType,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useRef, useState } from "react"

const useCourseCreate = () => {
  const [step, setStep] = useState<CourseCreateStep>(CourseCreateStep.START)
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>("forward")
  const isSearch = useRef<boolean>(false)
  const router = useRouter()

  const drawMapRef = useRef<NaverMap | null>(null)

  const [courseData, setCourseData] = useState<CourseData>({
    startLocation: null,
    endLocation: null,
    courseName: "",
    path: [],
    localAddress: "",
    distance: 0,
    imageFile: null,
    imageUrl: "",
    addressPOI: undefined,
  })

  const updateCourseData = (data: Partial<CourseData>) => {
    setCourseData((prev) => ({ ...prev, ...data }))
  }

  const updatePath = (path: Coordinates) => {
    setCourseData((prev) => ({ ...prev, path: [...prev.path, path] }))
  }

  const handleCapture = async () => {
    const mapElement = drawMapRef.current?.getElement()

    if (!mapElement) return

    const dataUrl = await domtoimage.toPng(mapElement, {
      width: 600,
      height: 600,
    })

    const blob = await fetch(dataUrl).then((res) => res.blob())

    const imageUrl = URL.createObjectURL(blob)

    updateCourseData({ imageFile: blob, imageUrl })
  }

  const handleNextStep = async () => {
    switch (step) {
      case CourseCreateStep.END:
        redirect("/course", "replace" as RedirectType)
      case CourseCreateStep.SEARCH:
        setNavigationDirection("backward")
        router.push(`?step=${CourseCreateStep.START}`)
        break
      case CourseCreateStep.DRAW:
        handleDrawT0NameStep()
        break
      case CourseCreateStep.CONFIRM:
        await handleSubmit()
        break
      default:
        router.push(`?step=${step + 1}`)
    }
  }

  const handlePrevStep = () => {
    if (step === CourseCreateStep.START) {
      redirect("/course", "replace" as RedirectType)
    } else if (step === CourseCreateStep.SEARCH) {
      setNavigationDirection("backward")
      router.push(`?step=${CourseCreateStep.START}`)
    } else {
      router.push(`?step=${step - 1}`)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append(
      "courseCreateRequest",
      JSON.stringify({
        courseName: courseData.courseName,
        geoPoints: courseData.path,
        distance: courseData.distance,
      }),
    )
    if (courseData.imageFile) {
      formData.append(
        "courseImage",
        courseData.imageFile,
        `${courseData.courseName}-${Date.now()}.png`,
      )
    }

    try {
      await createCourse(formData)
      setNavigationDirection("forward")
      router.push(`?step=${CourseCreateStep.END}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchStep = () => {
    isSearch.current = true
    router.push(`?step=${CourseCreateStep.SEARCH}`)
  }

  const handleDrawT0NameStep = async () => {
    await handleCapture()
    router.push(`?step=${CourseCreateStep.NAME}`)
  }

  const searchParams = useSearchParams()
  useEffect(() => {
    const stepParam = searchParams.get("step")

    if (
      stepParam &&
      +stepParam > CourseCreateStep.START &&
      +stepParam !== CourseCreateStep.SEARCH &&
      !courseData.startLocation
    ) {
      redirect(`?step=${CourseCreateStep.START}`, "replace" as RedirectType)
    }

    if (stepParam) {
      if (step < +stepParam && step !== CourseCreateStep.SEARCH) {
        setNavigationDirection("forward")
      } else {
        setNavigationDirection("backward")
      }

      setStep(+stepParam as CourseCreateStep)
    }
  }, [searchParams])

  return {
    isSearch,
    step,
    drawMapRef,
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
