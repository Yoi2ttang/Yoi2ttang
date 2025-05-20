import useGetAllTiles from "@/hooks/tile/useGetAllTiles"
import useGetTeamTile from "@/hooks/tile/useGetMyTeamTile"
import useGetOneTeamTileCluster from "@/hooks/tile/useGetOneTeamTileCluster"
import useGetPersonalTile from "@/hooks/tile/useGetPersonalTile"
import useGetTeamTileCluster from "@/hooks/tile/useGetTeamTileCluster"
import { getPayload } from "@/lib/auth/util"
import { Payload } from "@/types/auth/auth.type"
import { Coordinates } from "@/types/map/navermaps"
import { Tile, TileViewOption } from "@/types/map/tile"
import { useEffect, useState } from "react"

interface TileDataFetcherProps {
  tileMapType: "my" | "team"
}

export const useTileDataFetcher = ({ tileMapType }: TileDataFetcherProps) => {
  const [zodiacId, setZodiacId] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>("")

  const { mutateAsync: getPersonalTile } = useGetPersonalTile({
    memberId,
  })
  const { mutateAsync: getTeamTile } = useGetTeamTile({ zodiacId })
  const { mutateAsync: getAllTiles } = useGetAllTiles()
  const { mutateAsync: getTeamTileMapCluster } = useGetTeamTileCluster()
  const { mutateAsync: getOneTeamTileMapCluster } = useGetOneTeamTileCluster({
    zodiacId,
  })

  useEffect(() => {
    const { zodiacId, sub } = getPayload() as Payload
    setZodiacId(+zodiacId)
    setMemberId(sub)
  }, [])

  // 타일 데이터 가져오기
  const fetchTileData = async (
    selectedOption: TileViewOption | null,
    bounds: { sw: Coordinates; ne: Coordinates },
    center: Coordinates,
  ) => {
    let tileGetResponseList: Tile[] = []

    switch (selectedOption) {
      case TileViewOption.MY:
        console.log("타일 데이터 가져오기 특정 팀")
        const res1 = await getPersonalTile({
          lat: center.lat,
          lng: center.lng,
          localDate: new Date().toISOString().split("T")[0],
        })

        tileGetResponseList = res1?.tileGetResponseList ?? []
        break
      case TileViewOption.ALL:
      case TileViewOption.UNCLAIMED:
        console.log("타일 데이터 가져오기 전체 팀")
        const res2 = await getAllTiles({
          swLat: bounds.sw.lat,
          swLng: bounds.sw.lng,
          neLat: bounds.ne.lat,
          neLng: bounds.ne.lng,
        })

        tileGetResponseList = res2?.tileGetResponseList ?? []
        break
      case TileViewOption.TEAM:
        console.log("타일 데이터 가져오기 팀")
        const res = await getTeamTile({
          swLat: bounds.sw.lat,
          swLng: bounds.sw.lng,
          neLat: bounds.ne.lat,
          neLng: bounds.ne.lng,
        })

        tileGetResponseList = res?.tileGetResponseList ?? []
        break
      case null:
        if (tileMapType === "my") {
          console.log("타일 데이터 가져오기 개인")
          const res4 = await getPersonalTile({
            lat: center.lat,
            lng: center.lng,
            localDate: new Date().toISOString().split("T")[0],
          })

          tileGetResponseList = res4?.tileGetResponseList ?? []
        } else if (tileMapType === "team") {
          console.log("타일 데이터 가져오기 팀")
          const res = await getTeamTile({
            swLat: bounds.sw.lat,
            swLng: bounds.sw.lng,
            neLat: bounds.ne.lat,
            neLng: bounds.ne.lng,
          })

          tileGetResponseList = res?.tileGetResponseList ?? []
        }
        break
    }

    return tileGetResponseList
  }

  // 클러스터링 데이터 가져오기
  const fetchClusterData = async (
    selectedOption: TileViewOption | null,
    zoom: number,
    center: Coordinates,
  ) => {
    let tileClusterGetResponseList
    if (
      selectedOption === TileViewOption.MY ||
      (selectedOption === null && tileMapType === "my")
    ) {
      console.log("클러스터링 처리 특정 팀")
      const res = await getOneTeamTileMapCluster({
        lat: center.lat,
        lng: center.lng,
        zoomLevel: zoom,
      })

      tileClusterGetResponseList = res?.tileClusterGetResponseList ?? []
    } else if (
      selectedOption === TileViewOption.TEAM ||
      (selectedOption === null && tileMapType === "team")
    ) {
      console.log("클러스터링 처리 전체 팀")
      const res = await getTeamTileMapCluster({
        lat: center.lat,
        lng: center.lng,
        zoomLevel: zoom,
      })

      tileClusterGetResponseList = res?.tileClusterGetResponseList ?? []
    } else if (selectedOption === TileViewOption.ALL) {
      console.log("클러스터링 처리 미소유 타일")
    }
    return tileClusterGetResponseList
  }

  return { fetchTileData, fetchClusterData }
}
