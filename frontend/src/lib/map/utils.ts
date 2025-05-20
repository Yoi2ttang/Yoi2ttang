import { Coordinates, NaverMap } from "@/types/map/navermaps"

export const getMapBounds = (map: NaverMap | null) => {
  if (!map) return null

  const sw = {
    lat: map.getBounds().getMin().y,
    lng: map.getBounds().getMin().x,
  } as Coordinates

  const ne = {
    lat: map.getBounds().getMax().y,
    lng: map.getBounds().getMax().x,
  } as Coordinates

  if (
    sw.lat === undefined ||
    sw.lng === undefined ||
    ne.lat === undefined ||
    ne.lng === undefined
  ) {
    return null
  }

  return { sw, ne }
}
