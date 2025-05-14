import HeartRate from "@/assets/icons/running/heartRate.svg"

const RunningStats = () => (
  <>
    <div className="text-4xl font-bold italic">2.54KM</div>
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div className="text-lg text-neutral-500">이동 시간</div>
        <div className="text-xl font-semibold">01:01:30</div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="text-lg text-neutral-500">평균 속력</div>
        <div className="text-xl font-semibold">6.1km/h</div>
      </div>
    </div>
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div className="text-lg text-neutral-500">소모 칼로리</div>
        <div className="text-xl font-semibold">105kcal</div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="text-lg text-neutral-500">평균 심박수</div>
        <div className="flex items-center gap-1">
          <HeartRate />
          <div className="text-xl font-semibold">131</div>
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col">
      <div className="text-lg text-neutral-500">획득 타일</div>
      <div className="flex items-center gap-2">
        <div className="bg-yoi-500 size-4 rotate-12"></div>
        <div className="text-xl font-semibold">102</div>
      </div>
    </div>
  </>
)

export default RunningStats
