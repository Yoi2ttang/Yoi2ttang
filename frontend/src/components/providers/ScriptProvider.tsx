import Script from "next/script"

const naverMapScript = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`

export const ScriptProvider = () => {
  return (
    <>
      {/* <Head>
        <link rel="preconnect" href="https://openapi.map.naver.com/" />
        <link rel="preload" as="script" href={naverMapScript} />
      </Head> */}
      <Script strategy="beforeInteractive" src={naverMapScript} />
    </>
  )
}
