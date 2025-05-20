import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone", // 서버에 필요한 최소 파일만 패키징
  compress: true, // gzip 압축 설정

  // 개발 환경에서는 CORS 방지를 위한 리다이렉션 설정
  rewrites: async () =>
    isDev
      ? [
          {
            source: "/api/:slug*",
            destination: "https://yoi2ttang.site/api/:slug*",
          },
        ]
      : [],

  // 이미지 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yoi2ttang.site",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "ssacle.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "dummyimage.com",
        port: "",
      },
    ],
  },

  // TurboPack 설정
  // turbopack: {
  //   rules: {
  //     "*.svg": {
  //       loaders: ["@svgr/webpack"],
  //       as: "*.js",
  //     },
  //   },
  // },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // webpack 설정
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      },
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig
