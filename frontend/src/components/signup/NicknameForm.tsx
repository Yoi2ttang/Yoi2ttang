import { SignUpData } from "@/types/auth"
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import Button from "../common/Button"
import Input from "../common/Input"
import { debounce } from "lodash-es"
import { checkNicknameValidity } from "@/lib/auth/util"
import useCheckNicknameDuplication from "@/hooks/auth/useCheckNickname"
import { cn } from "@/lib/utils"

interface NicknameFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const NicknameForm = ({ signupData, onChange, onNext }: NicknameFormProps) => {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"valid" | "invalid">("valid")
  const { data: isDuplicated } = useCheckNicknameDuplication(
    signupData.nickname,
  )

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...signupData, nickname: e.target.value })
  }, 300)

  useEffect(() => {
    if (signupData.nickname === "") {
      setMessage("")
      setMessageType("valid")
      return
    }

    if (!checkNicknameValidity(signupData.nickname)) {
      setMessage("닉네임은 한글, 영문, 숫자로 2~10자만 사용 가능해요")
      setMessageType("invalid")
      return
    }

    if (isDuplicated) {
      setMessage("이미 사용 중인 닉네임이에요")
      setMessageType("invalid")
    } else {
      setMessage("사용 가능한 닉네임이에요")
      setMessageType("valid")
    }
  }, [signupData.nickname, isDuplicated])

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          닉네임을
          <br />
          입력해 주세요
        </h1>

        <Input
          variant={messageType === "valid" ? "default" : "error"}
          placeholder="닉네임을 입력해 주세요"
          onChange={handleChange}
        />
        <p
          className={cn(
            messageType === "valid" ? "text-green-500" : "text-red-500",
          )}>
          {message}
        </p>
      </div>

      <Button
        disabled={!signupData.nickname || messageType === "invalid"}
        className="w-full"
        onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

export default NicknameForm
