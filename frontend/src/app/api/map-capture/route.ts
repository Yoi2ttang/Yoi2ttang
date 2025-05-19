import { NextRequest, NextResponse } from "next/server"

interface MapCaptureRequest {
  center: string // 중심 좌표 (경도, 위도)
  level?: number // 확대 레벨
  w: number // 너비
  h: number // 높이
  maptype?: string // 지도 타입
  path: string // 경로 인코딩
  format?: string // 이미지 형식
  scale?: number // 이미지 배율
  markers?: string // 마커 정보
}

export const GET = async (request: NextRequest) => {
  // const {
  //   center,
  //   level,
  //   w,
  //   h,
  //   maptype,
  //   path,
  //   format,
  //   scale,
  //   markers,
  // }: MapCaptureRequest = await request.json()

  const APIGW_API_KEY_ID = process.env.NEXT_PUBLIC_NAVER_APIGW_API_KEY_ID
  const APIGW_API_KEY = process.env.NEXT_PUBLIC_NAVER_APIGW_API_KEY

  if (!APIGW_API_KEY_ID || !APIGW_API_KEY) {
    return NextResponse.json(
      { error: "Client ID or Secret is not set" },
      { status: 500 },
    )
  }

  const w = 1200
  const h = 1200
  const level = 17 // 너무 높으면 좁아 보여요 (18은 너무 확대됨)
  const crs = "EPSG:4326"

  // 중심점을 경로 중간쯤으로 설정
  const center = "126.9784147,37.5666805"

  // 마커들 (서울 시청, 을지로입구, 명동, 용산역)
  const markers = [
    "type:t|size:mid|color:0xCA2525|pos:126.9784147 37.5666805", // 서울 시청
    "type:t|size:mid|color:0x00AA00|pos:126.9743160 37.5620754", // 을지로입구
    "type:t|size:mid|color:0x0000FF|pos:126.9810479 37.5695075", // 명동
    "type:t|size:mid|color:0xFF00FF|pos:126.9950680 37.5612557", // 용산역
  ].join("|")

  // 폴리라인: 빨간 경로
  const paths =
    "weight:6|color:0xFF0000|pos:126.9784147,37.5666805|pos:126.990945,37.579945|pos:126.9950680,37.5612557"

  // const baseURL = "https://maps.apigw.ntruss.com/map-static/v2/raster"
  const baseURL = "https://maps.apigw.ntruss.com/map-static/v2/raster"

  const query = new URLSearchParams({
    center: "126.9784147,37.5666805",
    level: "16",
    w: "600",
    h: "400",
    markers,
    paths,
  }).toString()

  const url = `${baseURL}?${query}`
  // const url = `${baseURL}?w=${w}&h=${h}&level=${level}&crs=${crs}&center=${center}&markers=${encodeURIComponent(markers)}&paths=${encodeURIComponent(paths)}`
  // const url = `${baseURL}?w=${w}&h=${h}&level=${level}&crs=${crs}&center=${center}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": APIGW_API_KEY_ID,
      "X-NCP-APIGW-API-KEY": APIGW_API_KEY,
    },
  })

  console.log(response)

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch map image", status: response.status },
      { status: response.status },
    )
  }

  // 이미지 데이터 가져오기
  const imageData = await response.arrayBuffer()

  // Content-Type 결정 (format 파라미터에 따라 달라질 수 있음)
  const contentType = "image/jpeg"

  // 이미지 데이터 그대로 반환
  return new NextResponse(imageData, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      "no-store": "true", // 캐시 비활성화
    },
  })
}
