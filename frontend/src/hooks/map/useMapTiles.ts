import { Tile } from "@/types/map/tile"
import { RefObject, useEffect, useRef } from "react"

interface useMapTilesProps {
  mapRef: RefObject<naver.maps.Map | null>
  tiles: Tile[]
  myZodiacId?: number
  memberId?: string
}

const GAP = 0.00002

export const useMapTiles = ({
  mapRef,
  tiles,
  myZodiacId,
  memberId,
}: useMapTilesProps) => {
  const rectanglesRef = useRef<naver.maps.Rectangle[]>([])

  const renderTiles = (tiles: Tile[]) => {
    const map = mapRef.current
    if (!map || typeof window === "undefined" || !window.naver) {
      return
    }

    // 기존 타일 제거
    rectanglesRef.current.forEach((rectangle) => rectangle.setMap(null))
    rectanglesRef.current = []

    // ✅ 안전하게 배열 여부 확인
    if (!Array.isArray(tiles)) return

    // 새 타일 추가
    tiles.forEach(({ sw, ne, zodiacId }) => {
      let color

      const isMyTeam = zodiacId === myZodiacId
      const isUnclaimed = zodiacId === null

      if (isUnclaimed) {
        // 점령 되지 않은 땅
        color = "#a0a0a0"
        // return
      } else if (!isMyTeam) {
        // 다른 팀이 점령한 땅땅
        color = "#ff5959"
      } else {
        // color = animalMetaData[animalNumberMap[zodiacId.toString()]].color
        color = "#37E851"
      }

      const rectangle = new naver.maps.Rectangle({
        map,
        bounds: new naver.maps.LatLngBounds(
          new naver.maps.LatLng(sw.lat + GAP, sw.lng + GAP),
          new naver.maps.LatLng(ne.lat - GAP, ne.lng - GAP),
        ),
        strokeColor: color,
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: color, // 색상 적용
        fillOpacity: 0.3,
        clickable: true,
        strokeLineJoin: "round",
      })

      rectangle.addListener("click", (e) => {
        if (isUnclaimed) {
          // 점령 되지 않은 땅
          console.log("점령 되지 않은 땅")
        } else if (!isMyTeam) {
          // 다른 팀이 점령한 땅땅
          console.log("다른 팀이 점령한 땅땅")
        } else {
          // 내 팀이 점령한 땅
          console.log("내 팀이 점령한 땅")
        }
      })
      rectanglesRef.current.push(rectangle)
    })
  }

  useEffect(() => {
    if (mapRef.current && Array.isArray(tiles)) {
      renderTiles(tiles)
    }
  }, [tiles])

  return { renderTiles, rectanglesRef }
}
