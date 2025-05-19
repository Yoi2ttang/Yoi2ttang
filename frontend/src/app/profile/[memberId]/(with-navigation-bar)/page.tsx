import ProfileCompletedQuestSection from "@/components/profile/ProfileCompletedQuestSection"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"
import ProfileRunningRecordSection from "@/components/profile/ProfileRunningRecordSection"
import { getProfile } from "@/services/member/api-server"

interface ProfilePageProps {
  params: Promise<{
    memberId: number
  }>
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { memberId } = await params
  const { data, isError } = await getProfile(memberId)

  return (
    <div>
      <ProfileHeader />

      <div className="flex flex-col gap-6 p-4">
        {!data || isError ? (
          <p className="text-center text-neutral-400">존재하지 않는 유저에요</p>
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
