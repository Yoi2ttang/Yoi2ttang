"use client"

import SignupForm from "@/components/signup/SignupForm"
import TeamSelectionForm from "@/components/signup/TeamSelectionForm"
import TermForm from "@/components/signup/TermForm"
import { SignUpData, SignupStep } from "@/types/signup/signup"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SignupPage = () => {
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

  const renderForm = () => {
    switch (step) {
      case SignupStep.TERM:
        return (
          <TermForm
            signupData={signupData}
            onChange={setSignupData}
            onNext={() => setStep(step + 1)}
          />
        )
      case SignupStep.COMPLETED:
        return (
          <TeamSelectionForm
            signupData={signupData}
            onNext={() => router.replace("/")}
          />
        )
      default:
        return (
          <SignupForm
            signupData={signupData}
            onChange={setSignupData}
            step={step}
            onPrev={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
          />
        )
    }
  }

  return <div className="h-dvh overflow-hidden">{renderForm()}</div>
}

export default SignupPage
