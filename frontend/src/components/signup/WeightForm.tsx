import { SignUpData } from "@/types/auth"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"
import { clamp } from "lodash-es"

const MIN_WEIGHT = 1
const MAX_WEIGHT = 1_000

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
          입력해 주세요 (선택)
        </h1>

        <Input
          type="number"
          placeholder="미입력 시 평균 체중이 적용돼요"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={!signupData.weight ? "" : signupData.weight}
          onChange={handleChange}
        />
      </div>

      <Button className="w-full" onClick={onNext}>
        가입하기
      </Button>
    </div>
  )
}

export default WeightForm
