import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import StartRunning from "@/assets/icons/running/start-running.svg"
import PauseRunning from "@/assets/icons/running/pause-running.svg"
import FinishRunning from "@/assets/icons/running/finish-running.svg"
import ShareRunning from "@/assets/icons/running/share-running.svg"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"
import { useUpdateEndRunning } from "@/hooks/running/useUpdateEndRunning"

interface RunningActionsProps {
  isPaused: boolean
  setIsPaused: Dispatch<SetStateAction<boolean>>
}

const RunningActions = ({ isPaused, setIsPaused }: RunningActionsProps) => {
  const router = useRouter()
  const { runningId } = useRunningStatsContext()
  const { mutate: endRunning } = useUpdateEndRunning()

  const handleStopRunning = () => {
    if (!runningId) {
      console.error("러닝 ID 없음 - 종료 요청 불가")
      return
    }

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
    <div className="flex items-center justify-between text-center text-sm">
      <div
        className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-neutral-300"
        onClick={() => setIsPaused((prev) => !prev)}>
        {isPaused ? (
          <>
            <StartRunning className="size-7" />
            다시 달리기
          </>
        ) : (
          <>
            <PauseRunning className="size-7" />
            일시 정지
          </>
        )}
      </div>
      <div
        className="bg-yoi-500 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full text-white"
        onClick={handleStopRunning}>
        <FinishRunning className="size-7" />
        점령 완료
      </div>
      <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border-2">
        <ShareRunning className="size-7" />
        공유
      </div>
    </div>
  )
}

export default RunningActions
