"use client"

import ProfileCompletedCourseSection from "@/components/profile/ProfileCompletedCourseSection"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"
import ProfileRunningRecordSection from "@/components/profile/ProfileRunningRecordSection"
import useGetProfile from "@/hooks/profile/useGetProfile"
import ProfileInfoSkeleton from "./../../../../../components/profile/ProfileInfoSkeleton"
import ProfileRunningRecordSectionSkeleton from "@/components/profile/ProfileRunningRecordSectionSkeleton"
import ProfileCompletedCourseSectionSkeleton from "@/components/profile/ProfileCompletedCourseSectionSkeleton"

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetProfile()

  return (
    <div>
      <ProfileHeader />

      <div className="flex flex-col gap-6 p-4">
        {isError ? (
          <p className="text-center text-neutral-400">존재하지 않는 유저에요</p>
        ) : ( 
          <>
            {isLoading ? (
              <>
                <ProfileInfoSkeleton />
                <ProfileRunningRecordSectionSkeleton />
                <ProfileCompletedCourseSectionSkeleton />
              </>
            ) : (
              <>
                <ProfileInfo data={data} />
                <ProfileRunningRecordSection data={data} />
                <ProfileCompletedCourseSection data={data} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
