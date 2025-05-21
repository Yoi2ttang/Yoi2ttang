"use client"

import { useDevice } from "@/components/DeviceProvider"
import IntroduceContentContainer from "@/components/Introduce/IntroduceContent"
import OnboardContent from "@/components/onboard/OnboardContent"

const Home = () => {
  const { isDesktop, isWebView } = useDevice()

  if (isWebView) {
    return <OnboardContent />
  }

  if (!isDesktop && !isWebView) {
    return <IntroduceContentContainer />
  }

  return null
}

export default Home
