import { ArrowLeft } from "lucide-react"

interface RunningStatsButtonProps {
  onClick: () => void
}

const RunningStatsButton = ({ onClick }: RunningStatsButtonProps) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition active:scale-95">
    <span className="text-2xl font-bold">
      <ArrowLeft />
    </span>
  </button>
)

export default RunningStatsButton
