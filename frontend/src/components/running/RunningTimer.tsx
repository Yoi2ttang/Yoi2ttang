"use cient"

interface RunningTimerProps {
  runningTime: number
}

const RunningTimer = ({ runningTime }: RunningTimerProps) => {
  const hours = String(Math.floor(runningTime / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((runningTime % 3600) / 60)).padStart(2, "0")
  const seconds = String(runningTime % 60).padStart(2, "0")

  return (
    <div className="absolute top-10 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-3">
      <div className="text-4xl font-bold text-black italic">
        {hours}:{minutes}:{seconds}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="bg-yoi-500 size-3 rotate-12" />
        <div className="text-xl font-bold">102</div>
      </div>
    </div>
  )
}

export default RunningTimer
