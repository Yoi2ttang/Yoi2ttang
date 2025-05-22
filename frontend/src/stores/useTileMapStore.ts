import { Tile, TileCluster, TileViewOption } from "@/types/map/tile"
import { create } from "zustand"

export enum TileToggleOption {
  DEFAULT = "DEFAULT", // 기본
  UNCLAIMED = "UNCLAIMED", // 미점령 타일만 보기
  MY = "MY", // 내 팀 타일만 보기
  TEAM = "TEAM", // 다른 팀 타일만 보기
  ALL_COLOR = "ALL_COLOR", // 모든 타일 색상 보기
}

export const CLUSTERING_ZOOM_LEVEL = 16
export const MIN_ZOOM_LEVEL = 11

interface TileMapStore {
  tiles: Tile[]
  cluster: TileCluster[]
  selectedOption: TileViewOption | null
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) => void
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) => void

  setSelectedOption: (
    selectedOption:
      | TileViewOption
      | null
      | ((selectedOption: TileViewOption | null) => TileViewOption | null),
  ) => void
}

const useTileMapStore = create<TileMapStore>((set, get) => ({
  tiles: [],
  cluster: [],
  selectedOption: TileViewOption.TEAM,
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) =>
    set({
      tiles: typeof tiles === "function" ? tiles(get().tiles) : tiles,
    }),
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) =>
    set({
      cluster: typeof cluster === "function" ? cluster(get().cluster) : cluster,
    }),

  setSelectedOption: (
    selectedOption:
      | TileViewOption
      | null
      | ((selectedOption: TileViewOption | null) => TileViewOption | null),
  ) =>
    set({
      selectedOption:
        typeof selectedOption === "function"
          ? selectedOption(get()?.selectedOption)
          : selectedOption,
    }),
}))

export default useTileMapStore
