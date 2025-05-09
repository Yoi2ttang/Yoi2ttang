const PreRunningRankingInfo = () => {
  return (
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
  )
}

export default PreRunningRankingInfo
