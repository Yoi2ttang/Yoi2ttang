"use client"

import { createCourse } from "@/services/course/api"
import {
  CourseCreateStep,
  CourseData,
  NavigationDirection,
} from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import domtoimage from "dom-to-image-more"
import { redirect, RedirectType } from "next/navigation"
import { useRef, useState } from "react"

const useCourseCreate = () => {
  const [step, setStep] = useState<CourseCreateStep>(CourseCreateStep.START)
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>("forward")
  const isSearch = useRef<boolean>(false)

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

    const dataUrl = await domtoimage.toPng(mapElement, {
      width: 600,
      height: 600,
    })

    const blob = await fetch(dataUrl).then((res) => res.blob())

    const imageUrl = URL.createObjectURL(blob)
    // const formData = new FormData()
    // formData.append("file", blob, `${courseData.courseName}-${Date.now()}.png`)

    console.log(imageUrl)
    updateCourseData({ imageFile: blob, imageUrl })
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
      case CourseCreateStep.DRAW:
        handleDrawNameStep()
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
    console.log(
      JSON.stringify({
        courseName: courseData.courseName,
        geoPoints: courseData.path,
        distance: 0.1,
      }),
    )
    const formData = new FormData()
    formData.append(
      "courseCreateRequest",
      JSON.stringify({
        courseName: courseData.courseName,
        geoPoints: courseData.path,
        distance: 12,
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
      setStep(CourseCreateStep.END)
      window.history.pushState(null, "", `?step=${CourseCreateStep.END}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchStep = () => {
    isSearch.current = true
    setNavigationDirection("forward")
    setStep(CourseCreateStep.SEARCH)
    window.history.pushState(null, "", `?step=${CourseCreateStep.SEARCH}`)
  }

  const handleDrawNameStep = async () => {
    await handleCapture()
    setNavigationDirection("forward")
    setStep(step + 1)
    window.history.pushState(null, "", `?step=${step + 1}`)
  }

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
