import { Tile } from "@/types/map/tile"
import { RefObject, useEffect, useRef } from "react"

interface useMapTilesProps {
  mapRef: RefObject<naver.maps.Map | null>
  tiles: Tile[]
}

export const useMapTiles = ({ mapRef, tiles }: useMapTilesProps) => {
  const rectanglesRef = useRef<naver.maps.Rectangle[]>([])

  const renderTiles = (tiles: Tile[], color = "#FF7C64") => {
    const map = mapRef.current
    if (!map || typeof window === "undefined" || !window.naver) {
      return
    }

    // 기존 타일 제거
    rectanglesRef.current.forEach((rectangle) => rectangle.setMap(null))
    rectanglesRef.current = []

    // 새 타일 추가
    tiles.forEach(({ sw, ne }) => {
      const rectangle = new naver.maps.Rectangle({
        map,
        bounds: new naver.maps.LatLngBounds(
          new naver.maps.LatLng(sw.lat, sw.lng),
          new naver.maps.LatLng(ne.lat, ne.lng),
        ),
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.6,
      })
      rectanglesRef.current.push(rectangle)
    })
  }

  useEffect(() => {
    if (mapRef.current) {
      renderTiles(tiles)
    }
  }, [tiles])

  return { renderTiles, rectanglesRef }
}
