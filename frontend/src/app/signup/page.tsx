"use client"

import SignupForm from "@/components/signup/SignupForm"
import TeamSelectionForm from "@/components/signup/TeamSelectionForm"
import TermForm from "@/components/signup/TermForm"
import { SignUpData, SignupStep } from "@/types/auth/auth.type"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

const SignupContent = () => {
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
            onNext={() => setStep(step + 1)}
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
            onPrev={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
          />
        )
    }
  }

  return <div className="h-dvh overflow-hidden">{renderForm()}</div>
}

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  )
}

export default SignupPage
