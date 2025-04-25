import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/api/:slug*",
      destination: "https://yoi2ttang.com/api/:slug*",
    },
  ],
}

export default nextConfig
