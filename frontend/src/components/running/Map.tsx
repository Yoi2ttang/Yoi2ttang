import { Coordinates } from "@/types/map/navermaps"
import { useNaverMap } from "@/hooks/map/userNaverMap"
import Script from "next/script"
import { useState } from "react"

interface Tile {
  sw: Coordinates
  ne: Coordinates
}

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
}

const Map = ({ loc, tiles = [], zoom = 15 }: MapProps) => {
  const { initializeMap } = useNaverMap()
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const handleScriptLoad = () => {
    setIsScriptLoaded(true)
    if (loc) {
      initializeMap({ loc, tiles, zoom })
    }
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        onLoad={handleScriptLoad}
      />
      <div id="naver-map" className="h-full w-full" />
    </>
  )
}

export default Map
