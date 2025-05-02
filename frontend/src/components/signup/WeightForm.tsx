import { SignUpData } from "@/types/signup/signup"
import { Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"

interface WeightFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const WeightForm = ({ signupData, onChange, onNext }: WeightFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...signupData, nickname: e.target.value })
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          몸무게를
          <br />
          입력해 주세요 (선택)
        </h1>

        <Input
          type="number"
          placeholder="미입력 시 나이대 평균 몸무게로 적용돼요"
          value={signupData.nickname}
          onChange={handleChange}
        />
      </div>

      <Button className="w-full">가입하기</Button>
    </div>
  )
}

export default WeightForm
