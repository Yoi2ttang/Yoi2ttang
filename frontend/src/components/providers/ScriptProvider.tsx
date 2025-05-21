import Script from "next/script"

const naverMapScript = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`

export const ScriptProvider = () => {
  return (
    <>
      <Script strategy="beforeInteractive" src={naverMapScript} />
    </>
  )
}
