import { SignUpData, SignupStep } from "@/types/auth"
import { Dispatch, SetStateAction } from "react"
import ProgressBar from "../common/ProgressBar"
import StackHeader from "../layouts/Header/StackHeader"
import BirthForm from "./BirthForm"
import GenderForm from "./GenderForm"
import NicknameForm from "./NicknameForm"
import WeightForm from "./WeightForm"
import useSignup from "@/hooks/auth/useSignup"

interface SignupFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  step: SignupStep
  onPrev: () => void
  onNext: () => void
}

const SignupForm = ({
  signupData,
  onChange,
  step,
  onPrev,
  onNext,
}: SignupFormProps) => {
  const { signup } = useSignup(signupData)

  // 숫자형 Enum은 양방향 매핑(0: "TERM", "TERM": 0)이 되므로, filter를 사용하여 추출한다.
  const stepCount =
    Object.keys(SignupStep).filter((key) => isNaN(Number(key))).length - 2 // TERM, COMPLETED 제외

  const renderForm = () => {
    switch (step) {
      case SignupStep.NICKNAME:
        return (
          <NicknameForm
            signupData={signupData}
            onChange={onChange}
            onNext={onNext}
          />
        )
      case SignupStep.BIRTH:
        return (
          <BirthForm
            signupData={signupData}
            onChange={onChange}
            onNext={onNext}
          />
        )
      case SignupStep.GENDER:
        return (
          <GenderForm
            signupData={signupData}
            onChange={onChange}
            onNext={onNext}
          />
        )
      case SignupStep.WEIGHT:
        return (
          <WeightForm
            signupData={signupData}
            onChange={onChange}
            onNext={() => {
              signup()
              onNext()
            }}
          />
        )
    }
  }

  return (
    <div className="flex h-full flex-col">
      <StackHeader title="" onClick={onPrev} />

      <div className="flex flex-1 flex-col gap-9 p-6">
        <ProgressBar
          value={100 * ((step - 1) / (stepCount - 1))}
          stepCount={stepCount}
          className="bg-neutral-200"
          indicatorClassName="bg-yoi-500"
        />

        {renderForm()}
      </div>
    </div>
  )
}

export default SignupForm
