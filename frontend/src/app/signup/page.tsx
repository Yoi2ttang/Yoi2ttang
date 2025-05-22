"use client"

import StackAnimated from "@/components/animated/StackAnimated"
import SignupForm from "@/components/signup/SignupForm"
import TeamSelectionForm from "@/components/signup/TeamSelectionForm"
import TermForm from "@/components/signup/TermForm"
import { SignUpData, SignupStep } from "@/types/auth/auth.type"
import { NavigationDirection } from "@/types/course.type"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SignupPage = () => {
  const [direction, setDirection] = useState<NavigationDirection>("forward")
  const [step, setStep] = useState<SignupStep>(SignupStep.TERM)
  const [signupData, setSignupData] = useState<SignUpData>({
    socialId: "",
    agreements: {
      privacy: false,
      location: false,
      marketing: false,
    },
    nickname: "",
    birth: {
      year: "",
      month: "",
      day: "",
    },
    gender: "",
    weight: 0,
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStepChange = (direction: NavigationDirection) => {
    setDirection(direction)
    setStep(step + (direction === "forward" ? 1 : -1))
  }

  useEffect(() => {
    const socialId = searchParams.get("socialId")
    if (socialId) {
      setSignupData({
        ...signupData,
        socialId,
      })
    }
  }, [searchParams])

  const renderForm = () => {
    switch (step) {
      case SignupStep.TERM:
        return (
          <TermForm
            signupData={signupData}
            onChange={setSignupData}
            onNext={() => handleStepChange("forward")}
          />
        )
      case SignupStep.COMPLETED:
        return (
          <TeamSelectionForm onNext={() => router.replace("/dashboard/my")} />
        )
      default:
        return (
          <SignupForm
            signupData={signupData}
            onChange={setSignupData}
            step={step}
            onPrev={() => handleStepChange("backward")}
            onNext={() => handleStepChange("forward")}
          />
        )
    }
  }

  return (
    <StackAnimated direction={direction} step={step}>
      <div className="h-dvh overflow-hidden bg-neutral-50">{renderForm()}</div>
    </StackAnimated>
  )
}

export default SignupPage
