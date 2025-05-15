import { Coordinates } from "./map/navermaps"

export enum CourseCreateStep {
  START,
  DRAW,
  NAME,
  CONFIRM,
  END,
  SEARCH,
}

export interface POI {
  name: string
  address: string
  coordinates: Coordinates
}

export interface CourseData {
  startLocation: Coordinates
  endLocation: Coordinates
  courseName: string
  path: Coordinates[]
  localAddress: string
  distance: number
  image: FormData | null
}

export interface StepConfig {
  title: string
  buttonText: string
}

export type NavigationDirection = "forward" | "backward"

export interface SearchResult {
  title: string
  roadAddress: string
  lat: number
  lng: number
}

export interface MapClickEvent {
  type: "click"
  originalEvent: {
    type: "click"
    pageX: number
    pageY: number
    target: {
      contextmenu: null
    }
  }
  domEvent: {
    type: "click"
    pageX: number
    pageY: number
    target: {
      contextmenu: null
    }
  }
  pointerEvent: {
    type: "click"
    pageX: number
    pageY: number
    target: {
      contextmenu: null
    }
  }
  offset: {
    x: number
    y: number
  }
  point: {
    x: number
    y: number
  }
  coord: {
    y: number
    _lat: number
    x: number
    _lng: number
  }
  latlng: {
    y: number
    _lat: number
    x: number
    _lng: number
  }
}
