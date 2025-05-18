import { useEffect, useRef } from "react"
import { NaverMap } from "@/types/map/navermaps"
import { TileCluster } from "@/types/map/tile"

interface Props {
  mapRef: React.RefObject<NaverMap | null>
  tileClusters: TileCluster[]
}

export const useMapTileClusters = ({ mapRef, tileClusters }: Props) => {
  const markersRef = useRef<naver.maps.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    const newMarkers = tileClusters.map((cluster) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          cluster.geoPoint.lat,
          cluster.geoPoint.lng,
        ),
        map,
        icon: {
          content: `
    <div style="
      width: 42px;
      height: 42px;
      background-color: #ff7c64;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(10deg);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    ">
      <div style="
        transform: rotate(-10deg);
        color: white;
        font-weight: 700;
        font-size: 16px;
        font-family: 'Pretendard', sans-serif;
      ">
        ${cluster.count}
      </div>
    </div>
  `,
          anchor: new naver.maps.Point(21, 21),
        },
      })

      return marker
    })

    markersRef.current = newMarkers
  }, [mapRef, tileClusters])
}
