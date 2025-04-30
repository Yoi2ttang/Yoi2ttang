"use client"

import Button from "@/components/common/Button"
import InfoForm from "@/components/signup/InfoForm"
import TermForm from "@/components/signup/TermForm"
import { RequiredTerm, SignupStep } from "@/types/signup/signup"
import { useState } from "react"

const SignupPage = () => {
  const [step, setStep] = useState<SignupStep>(SignupStep.TERM)

  const [termChecks, setTermChecks] = useState<RequiredTerm>({
    privacy: false,
    location: false,
    marketing: false,
  })

  const handleTermCheck = (type: string, checked: boolean) => {
    if (type === "all") {
      setTermChecks({
        privacy: checked,
        location: checked,
        marketing: checked,
      })
    } else {
      setTermChecks((prev) => ({
        ...prev,
        [type]: checked,
      }))
    }
  }

  const renderForm = () => {
    switch (step) {
      case SignupStep.TERM:
        return <TermForm termChecks={termChecks} onChange={handleTermCheck} />
      default:
        return <InfoForm />
    }
  }

  return (
    <div className="relative flex h-dvh flex-col justify-between overflow-hidden p-6">
      {renderForm()}

      <Button disabled={!termChecks.privacy || !termChecks.location}>
        다음
      </Button>
    </div>
  )
}

export default SignupPage
