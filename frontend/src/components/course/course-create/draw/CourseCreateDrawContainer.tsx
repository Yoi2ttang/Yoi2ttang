import ReactDOMServer from "react-dom/server"

import StartPin from "@/components/course/StartPin"
import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import {
  CourseCreateStep,
  CourseData,
  MapClickEvent,
} from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { RefObject, useEffect, useRef } from "react"
import CourseHeader from "../../CourseHeader"
import EndPin from "./EndPin"

interface CourseCreateDrawContainerProps {
  drawMapRef: RefObject<NaverMap | null>
  path: Coordinates[]
  step: CourseCreateStep
  courseData: CourseData
  title: string
  onPrevStep: () => void
  updatePath: (path: Coordinates) => void
  updateCourseData: (data: Partial<CourseData>) => void
}

const CourseCreateDrawContainer = ({
  drawMapRef,
  path,
  step,
  courseData,
  title,
  onPrevStep,
  updatePath,
  updateCourseData,
}: CourseCreateDrawContainerProps) => {
  const { mapRef, initializeMap } = useMapInitialize()

  if (!drawMapRef.current) {
    console.log("주입입")
    drawMapRef.current = mapRef?.current
  }

  const polylineRef = useRef<naver.maps.Polyline | null>(null)

  useEffect(() => {
    if (courseData.startLocation) {
      initializeMap({
        mapDiv: "draw-map",
        loc: courseData.startLocation,
        zoom: 17,
      })

      const map = mapRef.current as naver.maps.Map

      // 출발지 마커
      new naver.maps.Marker({
        position: courseData.startLocation,
        map,
        icon: {
          content: ReactDOMServer.renderToString(<StartPin step={step} />),
        },
      })

      // 지도 클릭 이벤트
      const clickListener = naver.maps.Event.addListener(
        map,
        "click",
        (e: MapClickEvent) => {
          const { _lat: lat, _lng: lng } = e.coord
          updatePath({ lat, lng })
          updateCourseData({
            endLocation: { lat, lng },
          })
        },
      )

      return () => {
        naver.maps.Event.removeListener(clickListener)
      }
    }
  }, [])

  // path가 바뀔 때마다 Polyline 업데이트
  useEffect(() => {
    const map = mapRef.current as naver.maps.Map
    if (!map) {
      return
    }

    if (!polylineRef.current) {
      polylineRef.current = new naver.maps.Polyline({
        map,
        path,
        strokeColor: "#ff7c64",
        strokeWeight: 6,
        zIndex: 102,
      })
    } else {
      polylineRef.current.setPath(path)
    }

    // 폴리라인 마지막 좌표에 마커 추가
    if (path.length > 1) {
      const marker = new naver.maps.Marker({
        position: path[path.length - 1],
        map,
        icon: {
          content: ReactDOMServer.renderToString(
            <EndPin id={path.length - 1} />,
          ),
        },
      })
    }
  }, [path])

  return (
    <div>
      <CourseHeader title={title} showBackButton={true} onBack={onPrevStep} />
      <div id="draw-map" className="h-dvh w-full"></div>
    </div>
  )
}
export default CourseCreateDrawContainer
