const PreRunningTileInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-title-md">점령 현황</div>
        <div className="text-caption text-neutral-400">12:00 기준</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="size-3 rotate-12 bg-[#56ff89]"></div>
          <div>1등 팀 타일 수: </div>
          <div>10,954</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-yoi-500 size-3 rotate-12"></div>
          <div>우리 팀 타일 수: </div>
          <div>1,954</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border-2 border-neutral-300 p-2 text-center">
        <div className="text-md">
          <span>우리 팀이 </span>
          <span className="font-bold">3등</span>
          <span>을 달리고 있어요!</span>
        </div>
        <div>
          <span>(2등과의 차이 </span>
          <span className="text-blue-500">-324</span>
          <span>)</span>
        </div>
      </div>
    </div>
  )
}

export default PreRunningTileInfo
