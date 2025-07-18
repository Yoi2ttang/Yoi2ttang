import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { RefObject, useEffect, useRef } from "react"
import StartPin from "./StartPin"

interface CourseCreateMapProps {
  ref: RefObject<NaverMap | null>
  handleDragEnd: (coordinates: Coordinates) => void
  startLocation?: Coordinates | null
}

const CourseCreateMap = ({
  ref,
  handleDragEnd,
  startLocation,
}: CourseCreateMapProps) => {
  const { mapRef, initializeMap } = useMapInitialize()

  const listener = useRef<naver.maps.MapEventListener>(null)

  const handleIdle = () => {
    const center = mapRef.current?.getCenter() as naver.maps.LatLng
    handleDragEnd({
      lat: center.lat(),
      lng: center.lng(),
    })
  }

  useEffect(() => {
    if (!mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords

          initializeMap({
            loc: startLocation ?? { lat, lng },
            mapDiv: "naver-map",
            zoom: 16,
            onCenterChange: handleDragEnd,
          })

          ref.current = mapRef.current

          handleDragEnd({ lat, lng })
        },
        () => {},
        {
          enableHighAccuracy: true,
        },
      )
    } else {
      if (listener.current) {
        naver.maps.Event.removeListener(listener.current)
      }
      listener.current = naver.maps.Event.addListener(
        mapRef.current,
        "idle",
        handleIdle,
      )
    }
  }, [handleDragEnd, handleIdle])

  return (
    <>
      <div id="naver-map" className="h-[calc(100vh-25%)] w-full"></div>
      <StartPin className="absolute top-2/5 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}
export default CourseCreateMap
