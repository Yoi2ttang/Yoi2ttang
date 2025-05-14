import { SignUpData } from "@/types/auth"
import { clamp } from "lodash-es"
import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from "react"
import Button from "../common/Button"
import Input from "../common/Input"

interface BirthFormProps {
  signupData: SignUpData
  onChange: Dispatch<SetStateAction<SignUpData>>
  onNext: () => void
}

const BirthForm = ({ signupData, onChange, onNext }: BirthFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      // 년도의 길이가 4이상이 될 경우 입력 방지
      case "year":
        if (value.length > 4) {
          return
        }
        break
      // 월과 일의 길이가 2이상이 될 경우 입력 방지
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

    const number = parseInt(value, 10)
    let validatedBirth = { ...signupData.birth }

    switch (name) {
      // 년도의 범위를 벗어날 경우 최대, 최소값으로 보정
      case "year": {
        validatedBirth.year = clamp(
          number,
          1900,
          new Date().getFullYear(),
        ).toString()

        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()

        if (validatedBirth.month) {
          // 현재 년도보다 크거나 같고, 선택한 월이 현재 월보다 크다면 현재 월로 설정
          if (Number(validatedBirth.year) >= year && number > month) {
            validatedBirth.month = month.toString()
          } else {
            // 그 외의 경우 기존 로직대로 처리
            validatedBirth.month = clamp(number, 1, 12).toString()
          }
        }

        // 월이 바뀌었을 때, 일자가 최대 일자를 벗어날 경우 보정
        if (validatedBirth.day) {
          // 현재 년월과 같고, 일자가 현재 일자보다 크다면 현재 일자로 설정
          if (
            Number(validatedBirth.year) >= year &&
            Number(validatedBirth.month) >= month &&
            Number(validatedBirth.day) > day
          ) {
            validatedBirth.day = day.toString()
          } else {
            // 그 외의 경우 해당 월의 최대 일자로 제한
            validatedBirth.day = Math.min(
              Number(validatedBirth.day),
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
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1

        // 현재 년도보다 크거나 같고, 선택한 월이 현재 월보다 크다면 현재 월로 설정
        if (Number(validatedBirth.year) >= year && number > month) {
          validatedBirth.month = month.toString()
        } else {
          // 그 외의 경우 기존 로직대로 처리
          validatedBirth.month = clamp(number, 1, 12).toString()
        }

        // 월이 바뀌었을 때, 일자가 최대 일자를 벗어날 경우 보정
        if (validatedBirth.day) {
          const year = new Date().getFullYear()
          const month = new Date().getMonth() + 1
          const day = new Date().getDate()

          // 현재 년월보다 크거나 같고, 선택한 일이 현재 일보다 크다면 현재 일로 설정
          if (
            Number(validatedBirth.year) >= year &&
            Number(validatedBirth.month) >= month &&
            Number(validatedBirth.day) > day
          ) {
            validatedBirth.day = day.toString()
          } else {
            // 그 외의 경우 해당 월의 최대 일자로 제한
            validatedBirth.day = Math.min(
              Number(validatedBirth.day),
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
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()

        // 현재 년월과 같고, 선택한 일자가 현재 일자보다 크다면 현재 일자로 설정
        if (
          Number(validatedBirth.year) >= year &&
          Number(validatedBirth.month) >= month &&
          number > day
        ) {
          validatedBirth.day = day.toString()
        } else {
          // 그 외의 경우 기존 로직대로 처리
          validatedBirth.day = clamp(
            number,
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
