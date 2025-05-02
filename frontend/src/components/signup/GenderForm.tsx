import { SignUpData } from "@/types/signup/signup"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import { cn } from "./../../lib/utils"

interface GenderFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const GenderForm = ({ signupData, onChange, onNext }: GenderFormProps) => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
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
            value="male"
            onChange={handleSelect}
            className="hidden"
          />
          <label
            htmlFor="male"
            className={cn(
              "w-full cursor-pointer rounded-xl border-2 border-transparent bg-white py-4 text-center",
              signupData.gender === "male" && "border-yoi-500 text-yoi-500",
            )}>
            남성
          </label>

          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleSelect}
            className="hidden"
          />
          <label
            htmlFor="female"
            className={cn(
              "w-full cursor-pointer rounded-xl border-2 border-transparent bg-white py-4 text-center",
              signupData.gender === "female" && "border-yoi-500 text-yoi-500",
            )}>
            여성
          </label>

          {/* <Button
            variant="outline"
            className="w-full"
            onClick={() => handleClick("남성")}>
            남성
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleClick("여성")}>
            여성
          </Button> */}
        </div>
      </div>

      <Button
        disabled={!signupData.nickname}
        className="w-full"
        onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

export default GenderForm
