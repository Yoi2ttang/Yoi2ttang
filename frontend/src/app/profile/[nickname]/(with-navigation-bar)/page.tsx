import ProfileCompletedQuestSection from "@/components/profile/ProfileCompletedQuestSection"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"
import ProfileRunningRecordSection from "@/components/profile/ProfileRunningRecordSection"

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader />

      <div className="flex flex-col gap-6 p-4">
        <ProfileInfo
          nickname="ErO2거"
          animalType="tiger"
          stateMessage="가나다라맙소사 상태 메시지는 최대 64자까지 입력이 가능합니다.
          그래서 지금까지 몇 자인지 한 번 계산해 보도록 하"
        />

        <ProfileRunningRecordSection
          runningTime="9일 21시간 4분 23초"
          runningDistance="2,343"
          runningBlock="22,231"
        />

        <ProfileCompletedQuestSection />
      </div>
    </div>
  )
}

export default ProfilePage
