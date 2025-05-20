"use client"

import Section from "@/components/common/Section"
import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import useGetTeamTile from "@/hooks/tile/useGetMyTeamTile"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TileMapSectionProps {
  type: "my" | "team"
}

const TileMapSection = ({ type }: TileMapSectionProps) => {
  const [tiles, setTiles] = useState<Tile[]>([])

  const { mapRef, initializeMap } = useMapInitialize()
  const { addMarker } = useMapMarker({ mapRef })
  useMapTiles({ mapRef, tiles })

  const { mutateAsync: getTeamTileMap } = useGetTeamTile()

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTeamTileMap({
      zodiacId: 1,
      lat: center.lat,
      lng: center.lng,
    })
    setTiles([...res.tileGetResponseList])
  }

  useEffect(() => {
    if (!mapRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords
        initializeMap({
          loc: { lat, lng },
          onCenterChange: handleCenterChange,
          customOptions: {
            scrollWheel: false,
            disableDoubleTapZoom: false,
            disableTwoFingerTapZoom: false,
            logoControl: false,
            disableDoubleClickZoom: false,
            draggable: false,
            zoomControl: false,
            mapDataControl: false,
            scaleControl: false,
          },
        })
        addMarker({ lat, lng })
      })
    }
  }, [])

  return (
    <Section
      title="🪵 타일 한눈에 보기"
      supplement={
        <Link
          href={`/tile-map/${type}`}
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>전체 보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }>
      <div
        id="naver-map"
        className="aspect-video w-full rounded-md bg-neutral-200"
      />
    </Section>
  )
}
export default TileMapSection
