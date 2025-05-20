"use client"

import { useDevice } from "@/components/DeviceProvider"
import IntroduceContentContainer from "@/components/Introduce/IntroduceContent"

const Home = () => {
  const { isDesktop } = useDevice()

  if (!isDesktop) {
    return <div>온보딩</div>
  }

  return <IntroduceContentContainer />
}

export default Home
