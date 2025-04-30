import { RequiredTerm } from "@/types/signup/signup"
import Image from "next/image"
import TermCheckItem from "./TermCheckItem"

const TERM_CHECK_DATA = [
  {
    id: 0,
    type: "privacy",
    label: "(필수) 개인정보 처리 방침",
  },
  {
    id: 1,
    type: "location",
    label: "(필수) 위치 기반 서비스 이용약관",
  },
  {
    id: 2,
    type: "marketing",
    label: "(선택) 마케팅 알림 수신 동의",
  },
]

interface TermFormProps {
  termChecks: RequiredTerm
  onChange: (type: string, checked: boolean) => void
}

const TermForm = ({ termChecks, onChange }: TermFormProps) => {
  return (
    <>
      <div className="mt-8 flex flex-col justify-end gap-6">
        <h1 className="text-title-md">
          참가를 원하시면
          <br />
          서비스 이용약관에 동의해 주세요
        </h1>

        <div className="flex flex-col gap-6">
          <TermCheckItem
            type="all"
            label="네, 모두 동의합니다."
            checked={Object.values(termChecks).every((check) => check)}
            onChange={(checked) => onChange("all", checked)}
          />

          <hr />

          {TERM_CHECK_DATA.map((item) => (
            <TermCheckItem
              key={item.id}
              type={item.type}
              label={item.label}
              checked={termChecks[item.type as keyof typeof termChecks]}
              onChange={(checked) => onChange(item.type, checked)}
            />
          ))}

          <p className="text-caption text-neutral-300">
            필수 이용약관에 동의하지 않으면 서비스 이용에 제한이 있을 수
            있습니다. 선택 이용약관에 동의하지 않아도 서비스 이용이 가능합니다.
          </p>
        </div>
      </div>

      <Image
        src="/images/logo.svg"
        alt="logo"
        width={46}
        height={34}
        className="absolute top-1/2 left-1/3 w-96 opacity-5"
      />
    </>
  )
}

export default TermForm
