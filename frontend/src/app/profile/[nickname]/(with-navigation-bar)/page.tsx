import ProfileCompletedQuestSection from "@/components/profile/ProfileCompletedQuestSection"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"
import ProfileRunningRecordSection from "@/components/profile/ProfileRunningRecordSection"
import useProfile from "@/hooks/profile/useProfile"

interface ProfilePageProps {
  params: Promise<{
    nickname: string
  }>
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { nickname } = await params
  const { data, isError } = await useProfile(nickname)

  return (
    <div>
      <ProfileHeader />

      <div className="flex flex-col gap-6 p-4">
        {!data || isError ? (
          <div>{nickname}은 존재하지 않는 유저입니다.</div>
        ) : (
          <>
            <ProfileInfo data={data} />
            <ProfileRunningRecordSection data={data} />
            <ProfileCompletedQuestSection data={data} />
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
