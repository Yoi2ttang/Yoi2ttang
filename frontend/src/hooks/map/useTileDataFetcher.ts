import useGetAllTiles from "@/hooks/tile/useGetAllTiles"
import useGetTeamTile from "@/hooks/tile/useGetMyTeamTile"
import useGetOneTeamTileCluster from "@/hooks/tile/useGetOneTeamTileCluster"
import useGetPersonalTile from "@/hooks/tile/useGetPersonalTile"
import useGetTeamTileCluster from "@/hooks/tile/useGetTeamTileCluster"
import { Coordinates } from "@/types/map/navermaps"
import { Tile, TileViewOption } from "@/types/map/tile"
import { debounce } from "lodash-es"
import useGetPersonalTileCluster from "../tile/useGetPersonalTileCluster"

interface TileDataFetcherProps {
  myZodiacId: number
  memberId: string
}

export const useTileDataFetcher = ({
  myZodiacId,
  memberId,
}: TileDataFetcherProps) => {
  const { mutateAsync: getPersonalTile } = useGetPersonalTile({
    memberId,
  })
  const { mutateAsync: getTeamTile } = useGetTeamTile({ zodiacId: myZodiacId })
  const { mutateAsync: getAllTiles } = useGetAllTiles()
  const { mutateAsync: getTeamTileMapCluster } = useGetTeamTileCluster()
  const { mutateAsync: getOneTeamTileMapCluster } = useGetOneTeamTileCluster({
    zodiacId: myZodiacId,
  })
  const { mutateAsync: getPersonalTileCluster } = useGetPersonalTileCluster({
    memberId,
  })

  // 타일 데이터 가져오기
  const fetchTileData = async (
    selectedOption: TileViewOption | null,
    bounds: { sw: Coordinates; ne: Coordinates },
    center: Coordinates,
  ) => {
    let tileGetResponseList: Tile[] = []

    switch (selectedOption) {
      case TileViewOption.MY:
      case null:
        console.log("개인 타일 데이터 가져오기")
        const res1 = await getPersonalTile({
          lat: center.lat,
          lng: center.lng,
          localDate: new Date().toISOString().split("T")[0],
        })

        tileGetResponseList = res1?.tileGetResponseList ?? []
        break
      case TileViewOption.ALL:
      case TileViewOption.UNCLAIMED:
        const res2 = await getAllTiles({
          swLat: bounds.sw.lat,
          swLng: bounds.sw.lng,
          neLat: bounds.ne.lat,
          neLng: bounds.ne.lng,
        })

        tileGetResponseList = res2?.tileGetResponseList ?? []

        if (selectedOption === TileViewOption.UNCLAIMED) {
          console.log("점령 되지 않은 타일 필터링")
          tileGetResponseList = tileGetResponseList.filter(
            (tile) => tile.zodiacId === null,
          )
        } else {
          console.log("전체 타일 필터링")
          tileGetResponseList = tileGetResponseList.filter(
            (tile) => tile.zodiacId !== null,
          )
        }
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
    }

    return tileGetResponseList
  }

  // 클러스터링 데이터 가져오기
  const fetchClusterData = debounce(
    async (
      selectedOption: TileViewOption | null,
      zoom: number,
      center: Coordinates,
    ) => {
      let tileClusterGetResponseList

      switch (selectedOption) {
        case TileViewOption.MY:
        case null:
          console.log("클러스터링 처리 개인")
          const res = await getPersonalTileCluster({
            localDate: new Date().toISOString().split("T")[0],
            lat: center.lat,
            lng: center.lng,
            zoomLevel: zoom,
          })

          tileClusterGetResponseList = res?.tileClusterGetResponseList ?? []
          break
        case TileViewOption.TEAM:
          console.log("클러스터링 처리 특정 팀")
          const res1 = await getOneTeamTileMapCluster({
            lat: center.lat,
            lng: center.lng,
            zoomLevel: zoom,
          })

          tileClusterGetResponseList = res1?.tileClusterGetResponseList ?? []
          break
        case TileViewOption.ALL:
        case TileViewOption.UNCLAIMED:
          console.log("클러스터링 처리 전체 팀")
          const res2 = await getTeamTileMapCluster({
            lat: center.lat,
            lng: center.lng,
            zoomLevel: zoom,
          })

          tileClusterGetResponseList = res2?.tileClusterGetResponseList ?? []
          break
      }

      return tileClusterGetResponseList
    },
    0,
  )

  return { fetchTileData, fetchClusterData }
}
