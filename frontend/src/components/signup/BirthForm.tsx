import { SignUpData } from "@/types/signup/signup"
import { Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"

interface BirthFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const BirthForm = ({ signupData, onChange, onNext }: BirthFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "year":
        onChange({
          ...signupData,
          birth: { ...signupData.birth, year: e.target.value },
        })
        break
      case "month":
        onChange({
          ...signupData,
          birth: { ...signupData.birth, month: e.target.value },
        })
        break
      case "day":
        onChange({
          ...signupData,
          birth: { ...signupData.birth, day: e.target.value },
        })
        break
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          생년월일을
          <br />
          입력해 주세요
        </h1>

        <div className="flex justify-between gap-4">
          <Input
            type="number"
            placeholder="년도"
            name="year"
            value={signupData.birth.year}
            onChange={handleChange}
          />
          <Input
            type="number"
            placeholder="월"
            name="month"
            value={signupData.birth.month}
            onChange={handleChange}
          />
          <Input
            type="number"
            placeholder="일"
            name="day"
            value={signupData.birth.day}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        disabled={
          !signupData.birth.year ||
          !signupData.birth.month ||
          !signupData.birth.day
        }
        className="w-full"
        onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

export default BirthForm
