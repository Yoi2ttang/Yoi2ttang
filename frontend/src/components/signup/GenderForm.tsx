import { SignUpData } from "@/types/auth"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import { cn } from "./../../lib/utils"

interface GenderFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const GenderForm = ({ signupData, onChange, onNext }: GenderFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...signupData, gender: e.target.value })
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          성별을
          <br />
          선택해 주세요
        </h1>

        <div className="flex gap-4">
          <input
            type="radio"
            name="gender"
            id="male"
            value="MALE"
            onChange={handleChange}
            hidden
          />
          <label
            htmlFor="male"
            className={cn(
              "w-full cursor-pointer rounded-xl border-2 border-neutral-100 bg-white py-4 text-center text-neutral-400",
              signupData.gender === "MALE" &&
                "border-yoi-500 text-yoi-500 font-semibold",
            )}>
            남성
          </label>

          <input
            type="radio"
            name="gender"
            id="female"
            value="FEMALE"
            onChange={handleChange}
            hidden
          />
          <label
            htmlFor="female"
            className={cn(
              "w-full cursor-pointer rounded-xl border-2 border-neutral-100 bg-white py-4 text-center text-neutral-400",
              signupData.gender === "FEMALE" &&
                "border-yoi-500 text-yoi-500 font-semibold",
            )}>
            여성
          </label>
        </div>
      </div>

      <Button disabled={!signupData.gender} className="w-full" onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

export default GenderForm
