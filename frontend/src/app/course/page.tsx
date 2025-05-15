import Button from "@/components/common/Button"
import Link from "next/link"

interface QuestPageProps {}

const QuestPage = ({}: QuestPageProps) => {
  return (
    <div className="relative flex h-dvh flex-1 flex-col gap-10 px-4">
      <div className="fixed right-4 bottom-4">
        <Link href="/course/create">
          <Button>퀘스트 생성</Button>
        </Link>
      </div>
    </div>
  )
}
export default QuestPage
