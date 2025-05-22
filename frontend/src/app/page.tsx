"use client"

import { useDevice } from "@/components/DeviceProvider"
import IntroduceContentContainer from "@/components/Introduce/IntroduceContent"
import OnboardContent from "@/components/onboard/OnboardContent"

const Home = () => {
  const { isWebView, isDesktop } = useDevice()

  if (isWebView && !isDesktop) {
    return <OnboardContent />
  }

  if (!isWebView) {
    return <IntroduceContentContainer />
  }

  return null
}

export default Home
