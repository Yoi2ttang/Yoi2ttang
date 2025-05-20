"use client"

import IntroduceAppPreview from "./IntroduceAppPreview"
import IntroduceCTA from "./IntroduceCTA"
import IntroduceFeatures from "./IntroduceFeatures"
import IntroduceFooter from "./IntroduceFooter"
import IntroduceHeader from "./IntroduceHeader"
import IntroduceHero from "./IntroduceHero"
import IntroduceValueProps from "./IntroduceValueProps"

interface IntroduceContentProps {}

const IntroduceContentContainer = ({}: IntroduceContentProps) => {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#121212] dark:to-[#1a1a1a] dark:text-white">
      <IntroduceHeader />
      <IntroduceHero />
      <IntroduceFeatures />
      <IntroduceAppPreview />
      <IntroduceValueProps />
      {/* <IntroduceTestimonials /> */}
      <IntroduceCTA />
      <IntroduceFooter />
    </div>
  )
}

export default IntroduceContentContainer
