import { Settings2 } from "lucide-react"

interface RunningSettingsButtonProps {
  onClick: () => void
}

const RunningSettingsButton = ({ onClick }: RunningSettingsButtonProps) => (
  <button
    onClick={onClick}
    className="absolute right-4 bottom-8 z-10 rounded-full bg-white p-2 shadow-md transition active:scale-95">
    <Settings2 className="size-6 text-neutral-700" />
  </button>
)

export default RunningSettingsButton
