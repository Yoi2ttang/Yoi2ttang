import ReactDOMServer from "react-dom/server"

import Button from "@/components/common/Button"
import StartPin from "@/components/course/StartPin"
import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import {
  CourseCreateStep,
  CourseData,
  MapClickEvent,
} from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { Undo2 } from "lucide-react"
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
    drawMapRef.current = mapRef?.current
  }

  const polylineRef = useRef<naver.maps.Polyline | null>(null)
  const markerListRef = useRef<naver.maps.Marker[]>([])
  const markerIdRef = useRef<number>(1)

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
          // 거리 계산 후 추가

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
      // 폴리라인이 화면에 그려진 영역의 중심점(픽셀 기준)을 지도 좌표(위경도)로 변환하여 반환하는 코드
      polylineRef.current
        .getProjection()
        .fromOffsetToCoord(polylineRef.current.getDrawingRect().getCenter())

      polylineRef.current.setPath(path)
    }

    // 폴리라인 마지막 좌표에 마커 추가
    if (path.length > 1 && markerListRef.current.length < path.length - 1) {
      const marker = new naver.maps.Marker({
        position: path[path.length - 1],
        map,
        icon: {
          content: ReactDOMServer.renderToString(
            <EndPin id={markerIdRef.current} />,
          ),
        },
      })

      markerListRef.current.push(marker)
      markerIdRef.current++
    }
  }, [path])

  const handleUndo = () => {
    if (path.length < 2) {
      return
    }

    const newPath = path.slice(0, -1) // 마지막 좌표 제거
    const newDistance = polylineRef.current?.getDistance()

    // 거리 업데이트
    updateCourseData({
      path: newPath, // 마지막 좌표 제거
      distance: newDistance,
    })

    // 폴리라인 경로 중 마지막 좌표 제거
    polylineRef.current?.setPath(newPath)

    // 마지막 마커
    const deleteMarker = markerListRef.current[markerListRef.current.length - 1]

    if (deleteMarker) {
      deleteMarker.onRemove()
    }

    markerListRef.current = markerListRef.current.slice(0, -1)
  }

  return (
    <div>
      <CourseHeader title={title} showBackButton={true} onBack={onPrevStep} />
      <div id="draw-map" className="h-dvh w-full"></div>
      <Button
        className="absolute right-5 bottom-30 size-15 rounded-full p-2 shadow-md"
        variant="outline"
        onClick={handleUndo}>
        <Undo2 />
      </Button>
    </div>
  )
}
export default CourseCreateDrawContainer
