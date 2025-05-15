import { Dispatch, SetStateAction } from "react"
import StartRunning from "@/assets/icons/running/start-running.svg"
import PauseRunning from "@/assets/icons/running/pause-running.svg"
import FinishRunning from "@/assets/icons/running/finish-running.svg"
import ShareRunning from "@/assets/icons/running/share-running.svg"

interface RunningActionsProps {
  isPaused: boolean
  setIsPaused: Dispatch<SetStateAction<boolean>>
}

const RunningActions = ({ isPaused, setIsPaused }: RunningActionsProps) => {
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
      <div className="bg-yoi-400 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full text-white">
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
