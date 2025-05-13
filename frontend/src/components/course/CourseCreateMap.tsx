import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useEffect } from "react"

interface CourseCreateMapProps {}

const CourseCreateMap = ({}: CourseCreateMapProps) => {
  const { mapRef, initializeMap } = useMapInitialize()
  const { addMarker } = useMapMarker({ mapRef })

  useEffect(() => {
    if (!mapRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords
        initializeMap({
          loc: { lat, lng },
          mapDiv: "naver-map",
        })
        addMarker({ lat, lng })
      })
    }
  }, [])

  return <div id="naver-map" className="h-full w-full"></div>
}
export default CourseCreateMap
