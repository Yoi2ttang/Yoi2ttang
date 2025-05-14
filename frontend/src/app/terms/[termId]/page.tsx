import StackHeader from "@/components/layouts/Header/StackHeader"
import { getTerm } from "@/services/term/api"

// 동적 경로 중 type의 값이 generateStaticParams에 저장된 값이 아니라면 404 페이지로 보낸다.
export const dynamicParams = false

export const generateStaticParams = async () => {
  return [{ termId: "1" }, { termId: "2" }, { termId: "3" }]
}

const termList: Record<string, string> = {
  "1": "개인정보 처리 방침",
  "2": "위치 기반 서비스 이용약관",
  "3": "마케팅 홍보 활용 동의",
}

interface TermPageProps {
  params: Promise<{ termId: string }>
}

const TermPage = async ({ params }: TermPageProps) => {
  const { termId } = await params
  // const term = await getTerm(termId)

  return (
    <div>
      <StackHeader title={`${termList[termId]}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-6">
          <p>[현행] 2025년 4월 30일 시행안</p>
          <p className="text-lg">제 1조 (목적)</p>
          <p className="leading-[1.6]">
            이 약관은 주식회사 요이땅(이하 "회사"라 합니다)이 제공하는 요이땅
            서비스(이하 "서비스"라 합니다)와 관련하여, 회사 이용 고객간에
            서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 기타
            필요한 사항을 규정함을 목적으로 합니다. 본 약관은 PC통신,
            스마트폰(안드로이드 폰, 아이폰 등) 앱 등을 이용하는 전자상거래에
            대해서도 그 성질에 반하지 않는 한 준용됩니다.
          </p>

          <p>[현행] 2025년 4월 30일 시행안</p>
          <p className="text-lg">제 2조 (목적)</p>
          <p className="leading-[1.6]">
            이 약관은 주식회사 요이땅(이하 "회사"라 합니다)이 제공하는 요이땅
            서비스(이하 "서비스"라 합니다)와 관련하여, 회사 이용 고객간에
            서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 기타
            필요한 사항을 규정함을 목적으로 합니다. 본 약관은 PC통신,
            스마트폰(안드로이드 폰, 아이폰 등) 앱 등을 이용하는 전자상거래에
            대해서도 그 성질에 반하지 않는 한 준용됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermPage
