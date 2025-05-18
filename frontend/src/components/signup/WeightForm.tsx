import { MAX_WEIGHT, MIN_WEIGHT, SignUpData } from "@/types/auth"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"
import { clamp } from "lodash-es"

interface WeightFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const WeightForm = ({ signupData, onChange, onNext }: WeightFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      onChange({ ...signupData, weight: 0 })
      return
    } else if (value.length > 5) {
      return
    }

    const clampedWeight = clamp(
      Number(Number(value).toFixed(1)),
      MIN_WEIGHT,
      MAX_WEIGHT,
    )
    if (clampedWeight !== signupData.weight) {
      onChange({ ...signupData, weight: clampedWeight })
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          체중을
          <br />
          입력해 주세요
        </h1>

        <Input
          type="number"
          placeholder="체중을 입력해 주세요"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={!signupData.weight ? "" : signupData.weight}
          onChange={handleChange}
        />
      </div>

      <Button disabled={!signupData.weight} className="w-full" onClick={onNext}>
        가입하기
      </Button>
    </div>
  )
}

export default WeightForm
