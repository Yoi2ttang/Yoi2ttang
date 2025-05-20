"use client"

import { useDevice } from "@/components/DeviceProvider"
import IntroduceContentContainer from "@/components/Introduce/IntroduceContent"
import OnboardContent from "@/components/onboard/OnboardContent"

const Home = () => {
  const { isDesktop } = useDevice()

  if (!isDesktop) {
    return <OnboardContent />
  }

  return <IntroduceContentContainer />
}

export default Home
