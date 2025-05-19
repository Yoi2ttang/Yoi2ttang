type Lng = number;
type Lat = number;
export interface Coordinates {
  lat: Lng;
  lng: Lat;
}

export interface Tile {
  geoHash: string;
  sw: Coordinates;
  ne: Coordinates;
  zordiacId: number;
}
