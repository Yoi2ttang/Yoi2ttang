import React from "react"
import ReactDOMServer from "react-dom/server"

import TileInfoToast from "@/components/tiles/TileInfoToast"
import { Tile } from "@/types/map/tile"
import { RefObject, useEffect, useRef } from "react"

// Add type extension
interface ExtendedRectangle extends naver.maps.Rectangle {
  _clickListener?: naver.maps.MapEventListener
}

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
  const rectanglesRef = useRef<ExtendedRectangle[]>([])
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null) // 타일 클릭 시 표시되는 정보창

  const showInfoWindow = (
    message: string,
    position: naver.maps.Point,
    zodiacId: number,
  ) => {
    const map = mapRef.current
    if (!map) return

    if (!infoWindowRef.current) {
      infoWindowRef.current = new naver.maps.InfoWindow({
        content: ReactDOMServer.renderToString(
          React.createElement(TileInfoToast, {
            message,
            zodiacId,
          }),
        ),
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
        zIndex: 103,
        position: new naver.maps.Point(map.getCenter().x, map.getCenter().y),
      })
    }

    infoWindowRef.current.setContent(
      ReactDOMServer.renderToString(
        React.createElement(TileInfoToast, {
          message,
          zodiacId,
        }),
      ),
    )

    infoWindowRef.current.open(map, position)

    setTimeout(() => {
      infoWindowRef.current?.close()
    }, 2000)
  }

  const renderTiles = (tiles: Tile[]) => {
    const map = mapRef.current
    if (!map || typeof window === "undefined" || !window.naver) {
      return
    }

    rectanglesRef.current.forEach((rectangle) => rectangle.setMap(null))
    rectanglesRef.current = []

    if (!Array.isArray(tiles)) return

    tiles.forEach(({ sw, ne, zodiacId }) => {
      let color

      const isMyTeam = zodiacId === myZodiacId
      const isUnclaimed = zodiacId === null

      if (isUnclaimed) {
        color = "#a0a0a0"
      } else if (!isMyTeam) {
        color = "#ff5959"
      } else {
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
        fillColor: color,
        fillOpacity: 0.3,
        clickable: true,
        strokeLineJoin: "round",
      })

      const clickListener = (e: any) => {
        const coord = e.coord || e.latlng

        const point = new naver.maps.Point(coord.x, coord.y)

        if (isUnclaimed) {
          showInfoWindow("점령해보세요!", point, zodiacId)
        } else if (!isMyTeam) {
          showInfoWindow("다른 팀이 점령한 땅입니다", point, zodiacId)
        } else {
          showInfoWindow("우리팀 타일입니다.", point, zodiacId)
        }
      }

      rectangle.addListener("click", clickListener)

      rectanglesRef.current.push(rectangle)
    })
  }

  useEffect(() => {
    if (mapRef.current && Array.isArray(tiles)) {
      renderTiles(tiles)
    }

    return () => {
      rectanglesRef.current.forEach((rectangle) => {
        rectangle.setMap(null)
      })
      infoWindowRef.current?.setMap(null)
    }
  }, [tiles])

  return { renderTiles, rectanglesRef }
}
