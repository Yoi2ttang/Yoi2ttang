import { SignUpData } from "@/types/auth/auth.type"
import { clamp } from "lodash-es"
import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from "react"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"

interface BirthFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const BirthForm = ({ signupData, onChange, onNext }: BirthFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      // 년도의 길이가 4초과가 될 경우 입력 방지
      case "year":
        if (value.length > 4) {
          return
        }
        break
      // 월과 일의 길이가 각각 2초과가 될 경우 입력 방지
      case "month":
      case "day":
        if (value.length > 2) {
          return
        }
        break
    }

    onChange({
      ...signupData,
      birth: {
        ...signupData.birth,
        [name]: value,
      },
    })
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!value) {
      return
    }

    const today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    }
    const input = parseInt(value, 10)
    const validatedBirth = signupData.birth

    switch (name) {
      case "year": {
        // 년도 값 보정
        validatedBirth.year = clamp(input, 1900, today.year).toString()

        // 년도 값 변경에 따른 월 값 보정
        if (validatedBirth.month) {
          if (
            Number(validatedBirth.year) >= today.year &&
            Number(validatedBirth.month) > today.month
          ) {
            validatedBirth.month = today.month.toString()
          } else {
            validatedBirth.month = clamp(
              Number(validatedBirth.month),
              1,
              12,
            ).toString()
          }
        }

        // 년도, 월 값 변경에 따른 일 값 보정
        if (validatedBirth.day) {
          if (
            Number(validatedBirth.year) >= today.year &&
            Number(validatedBirth.month) >= today.month &&
            Number(validatedBirth.day) > today.day
          ) {
            validatedBirth.day = today.day.toString()
          } else {
            validatedBirth.day = clamp(
              Number(validatedBirth.day),
              1,
              new Date(
                Number(validatedBirth.year),
                Number(validatedBirth.month),
                0,
              ).getDate(),
            ).toString()
          }
        }
        break
      }
      case "month": {
        // 월 값 보정
        if (
          Number(validatedBirth.year) >= today.year &&
          Number(validatedBirth.month) > today.month
        ) {
          validatedBirth.month = today.month.toString()
        } else {
          validatedBirth.month = clamp(
            Number(validatedBirth.month),
            1,
            12,
          ).toString()
        }

        // 월 값 변경에 따른 일 값 보정
        if (validatedBirth.day) {
          if (
            Number(validatedBirth.year) >= today.year &&
            Number(validatedBirth.month) >= today.month &&
            Number(validatedBirth.day) > today.day
          ) {
            validatedBirth.day = today.day.toString()
          } else {
            validatedBirth.day = clamp(
              Number(validatedBirth.day),
              1,
              new Date(
                Number(validatedBirth.year),
                Number(validatedBirth.month),
                0,
              ).getDate(),
            ).toString()
          }
        }
        break
      }
      case "day": {
        // 일 값 보정
        if (
          Number(validatedBirth.year) >= today.year &&
          Number(validatedBirth.month) >= today.month &&
          Number(validatedBirth.day) > today.day
        ) {
          validatedBirth.day = today.day.toString()
        } else {
          validatedBirth.day = clamp(
            Number(validatedBirth.day),
            1,
            new Date(
              Number(validatedBirth.year),
              Number(validatedBirth.month),
              0,
            ).getDate(),
          ).toString()
        }
        break
      }
    }

    onChange({
      ...signupData,
      birth: validatedBirth,
    })
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
            min={1900}
            max={new Date().getFullYear()}
            value={signupData.birth.year || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="number"
            placeholder="월"
            name="month"
            variant={!signupData.birth.year ? "disabled" : "default"}
            min={1}
            max={12}
            value={signupData.birth.month || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="number"
            placeholder="일"
            name="day"
            variant={
              !signupData.birth.year || !signupData.birth.month
                ? "disabled"
                : "default"
            }
            min={1}
            max={new Date(
              Number(signupData.birth.year),
              Number(signupData.birth.month),
              0,
            ).getDate()}
            value={signupData.birth.day || ""}
            onChange={handleChange}
            onBlur={handleBlur}
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
