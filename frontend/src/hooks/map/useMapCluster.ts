import React from "react"
import ReactDOMServer from "react-dom/server"

import ClusterMarker from "@/components/tiles/tiles-map/ClusterMarker"
import { TileCluster } from "@/types/map/tile"
import { RefObject, useEffect, useRef } from "react"

interface useMapClusterProps {
  mapRef: RefObject<naver.maps.Map | null>
  clusterList: TileCluster[]
}

const useMapCluster = ({ mapRef, clusterList }: useMapClusterProps) => {
  const clusterListRef = useRef<naver.maps.Marker[]>([])

  const renderCluster = (clusterList: TileCluster[]) => {
    const map = mapRef.current
    if (!map || typeof window === "undefined" || !window.naver) {
      return
    }

    // 기존 클러스터 제거
    clusterListRef.current.forEach((marker) => marker.setMap(null))
    clusterListRef.current = []

    // 새 클러스터 추가
    clusterList.forEach(({ geoPoint, count, zodiacId }) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(geoPoint.lat, geoPoint.lng),
        map,
        icon: {
          content: ReactDOMServer.renderToString(
            React.createElement(ClusterMarker, { count, zodiacId }),
          ),
        },
      })

      clusterListRef.current.push(marker)
    })
  }

  useEffect(() => {
    if (mapRef.current) {
      renderCluster(clusterList)
    }
  }, [clusterList])
  return { clusterListRef }
}

export default useMapCluster
