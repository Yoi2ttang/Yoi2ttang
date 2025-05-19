"use cient"

import { formatSecondsToTime } from "@/lib/running/time"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"

const RunningTimer = () => {
  const { runningTime } = useRunningStatsContext()
  const formattedTime = formatSecondsToTime(runningTime)

  return (
    <div className="absolute top-10 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-3">
      <div className="text-4xl font-bold text-black italic">
        {formattedTime}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="bg-yoi-500 size-3 rotate-12" />
        <div className="text-xl font-bold">102</div>
      </div>
    </div>
  )
}

export default RunningTimer
