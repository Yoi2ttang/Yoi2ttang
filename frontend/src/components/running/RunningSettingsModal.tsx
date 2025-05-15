"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface RunningSettingsModalProps {
  onClose: () => void
}

const RunningSettingsModal = ({ onClose }: RunningSettingsModalProps) => {
  const [showTile, setShowTile] = useState(false)
  const [showOurTeamTile, setShowOurTeamTile] = useState(false)
  const [showEmptyTile, setShowEmptyTile] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="max-w-yoi-width relative w-full bg-black/20">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="absolute right-8 bottom-12 z-10 w-44 rounded-lg bg-white p-4 shadow-xl">
          <div className="space-y-2 text-sm text-neutral-700">
            <div className="flex items-center justify-between">
              <div>타일 보기</div>
              <Switch
                checked={showTile}
                onCheckedChange={setShowTile}
                className="data-[state=checked]:bg-yoi-500 scale-90 data-[state=unchecked]:bg-neutral-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>우리 팀 타일 보기</div>
              <Checkbox
                checked={showOurTeamTile}
                onCheckedChange={(checked) =>
                  setShowOurTeamTile(checked === true)
                }
                checkedBgClassName="bg-white"
                checkClassName="text-green-500 stroke-[3]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>빈 타일 보기</div>
              <Checkbox
                checked={showEmptyTile}
                onCheckedChange={(checked) =>
                  setShowEmptyTile(checked === true)
                }
                checkedBgClassName="bg-white"
                checkClassName="text-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunningSettingsModal
