"use client"

import { useDevice } from "@/components/DeviceProvider"
import IntroduceContentContainer from "@/components/Introduce/IntroduceContent"
import OnboardContent from "@/components/onboard/OnboardContent"

const Home = () => {
  const { isDesktop, isAndroid } = useDevice()

  if (isAndroid) {
    return <OnboardContent />
  }

  return <IntroduceContentContainer />
}

export default Home
