const PreRunningTileInfo = () => {
  return (
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
  )
}

export default PreRunningTileInfo
