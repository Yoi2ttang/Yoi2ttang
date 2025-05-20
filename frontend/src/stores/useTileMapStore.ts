import { Tile, TileCluster } from "@/types/map/tile"
import { create } from "zustand"

export enum TileToggleOption {
  DEFAULT = "DEFAULT", // 기본
  UNCLAIMED = "UNCLAIMED", // 미점령 타일만 보기
  MY = "MY", // 내 팀 타일만 보기
  TEAM = "TEAM", // 다른 팀 타일만 보기
  ALL_COLOR = "ALL_COLOR", // 모든 타일 색상 보기
}

interface TileMapStore {
  tiles: Tile[]
  cluster: TileCluster[]
  tileToggleOption: TileToggleOption
  setTiles: (tiles: Tile[] | ((tiles: Tile[]) => Tile[])) => void
  setCluster: (
    cluster: TileCluster[] | ((cluster: TileCluster[]) => TileCluster[]),
  ) => void
  setTileToggleOption: (
    tileToggleOption:
      | TileToggleOption
      | ((tileToggleOption: TileToggleOption) => TileToggleOption),
  ) => void
}

const useTileMapStore = create<TileMapStore>((set, get) => ({
  tiles: [],
  cluster: [],
  tileToggleOption: TileToggleOption.DEFAULT,
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
  setTileToggleOption: (
    tileToggleOption:
      | TileToggleOption
      | ((tileToggleOption: TileToggleOption) => TileToggleOption),
  ) =>
    set({
      tileToggleOption:
        typeof tileToggleOption === "function"
          ? tileToggleOption(get().tileToggleOption)
          : tileToggleOption,
    }),
}))

export default useTileMapStore
