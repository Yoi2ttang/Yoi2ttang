"use client"

import { useRunningStats } from "@/hooks/running/useRunningStats"
import Button from "../common/Button"

const formatPace = (seconds: number) => {
  const min = Math.floor(seconds / 60)
  const sec = Math.round(seconds % 60)
  return `${min}분 ${sec}초`
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}분 ${s}초`
}

const formatDistance = (m: number) => `${m.toFixed(1)}m`

interface RunningPaceLoggerProps {
  paceHistory: ReturnType<typeof useRunningStats>["paceHistory"]
  saveCurrentPace: () => void
}

const RunningPaceLogger = ({
  paceHistory,
  saveCurrentPace,
}: RunningPaceLoggerProps) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between pb-2">
        <div className="text-lg text-neutral-500">구간 페이스</div>
        <Button
          className="rounded-md px-3 py-1 text-xs text-white"
          onClick={saveCurrentPace}>
          + 구간 기록
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3">
        {paceHistory.length === 0 ? (
          <div className="mt-10 text-center text-sm text-neutral-400">
            아직 기록된 구간이 없습니다.
          </div>
        ) : (
          paceHistory.map((p, i) => (
            <div
              key={i}
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 shadow-sm">
              <div className="flex justify-between">
                <div className="mb-1 text-sm font-medium">{i + 1}구간</div>
                <div className="text-yoi-500 text-sm font-semibold">
                  {formatPace(p.pace)} / km
                </div>
              </div>
              <div className="mt-1 flex justify-between text-sm text-neutral-500">
                <span>
                  {formatTime(p.fromTime)} → {formatTime(p.toTime)}
                </span>
                <span>
                  {formatDistance(p.fromDistance)} →{" "}
                  {formatDistance(p.toDistance)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RunningPaceLogger
