import { SignUpData } from "@/types/auth"
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
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
  const [nickname, setNickname] = useState(signupData.nickname)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"valid" | "invalid">("valid")
  const { data: isDuplicated } = useCheckNicknameDuplication(
    signupData.nickname,
  )

  const updateSignupData = useMemo(
    () =>
      debounce((value: string) => {
        onChange({ ...signupData, nickname: value })
      }, 300),
    [signupData, onChange],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    updateSignupData(value)
  }

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
  }, [signupData, isDuplicated])

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-title-md">
          닉네임을
          <br />
          입력해 주세요
        </h1>

        <div className="relative">
          <Input
            variant={messageType === "valid" ? "default" : "error"}
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={handleChange}
          />
          <p
            className={cn(
              "absolute top-full mt-1",
              messageType === "valid" ? "text-green-500" : "text-red-500",
            )}>
            {message}
          </p>
        </div>
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
