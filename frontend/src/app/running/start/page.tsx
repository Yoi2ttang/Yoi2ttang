import Button from "@/components/common/Button"
import PreRunningTileInfo from "@/components/running/PreRunningTileInfo"

const Page = () => {
  return (
    <div className="flex h-screen flex-col justify-between pb-36">
      <PreRunningTileInfo />
      <Button className="w-full">참여하기</Button>
    </div>
  )
}

export default Page
