import Head from "next/head"
import Script from "next/script"

export const ScriptProvider = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href={`https://openapi.map.naver.com/`} />
        <link
          rel="preload"
          as="script"
          href={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        />
      </Head>
      <Script
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
      />
    </>
  )
}
