import { SignUpData } from "@/types/signup/signup"
import { Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"

interface NicknameFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const NicknameForm = ({ signupData, onChange, onNext }: NicknameFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...signupData, nickname: e.target.value })
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          닉네임을
          <br />
          입력해 주세요
        </h1>

        <Input
          placeholder="닉네임을 입력해 주세요"
          value={signupData.nickname}
          onChange={handleChange}
        />
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

export default NicknameForm
