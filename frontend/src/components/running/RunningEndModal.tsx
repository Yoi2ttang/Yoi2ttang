import { Dispatch, SetStateAction } from "react"
import Button from "../common/Button"
import { CircleCheck } from "lucide-react"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"
import { useUpdateEndRunning } from "@/hooks/running/useUpdateEndRunning"
import { useRouter } from "next/navigation"

interface RunningEndModalProps {
  setIsEndModalOpen: Dispatch<SetStateAction<boolean>>
}

const RunningEndModal = ({ setIsEndModalOpen }: RunningEndModalProps) => {
  const router = useRouter()

  const { runningId } = useRunningStatsContext()
  const { mutate: endRunning } = useUpdateEndRunning()

  const handleStopRunning = () => {
    if (!runningId) {
      console.error("러닝 ID 없음 - 종료 요청 불가")
      return
    }
    console.log("엥")
    endRunning(
      {
        runningId,
        endTime: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          console.log("러닝 종료 성공")
          router.replace("/ranking/teams")
        },
        onError: (error) => {
          console.error("러닝 종료 실패", error)
        },
      },
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={() => setIsEndModalOpen(false)}>
      <div className="flex w-80 flex-col items-center gap-8 rounded-lg bg-white p-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <CircleCheck className="stroke-yoi-500 size-10 stroke-1" />
          <p className="text-yoi-500 text-xl font-semibold">
            정말 점령을 완료할까요?
          </p>
          <p className="text-caption">현재까지의 기록이 반영됩니다.</p>
        </div>
        <div className="flex w-full justify-center gap-4">
          <Button
            className="flex flex-1 bg-neutral-300"
            onClick={() => setIsEndModalOpen(false)}>
            취소
          </Button>
          <Button className="flex flex-1" onClick={handleStopRunning}>
            종료하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RunningEndModal
