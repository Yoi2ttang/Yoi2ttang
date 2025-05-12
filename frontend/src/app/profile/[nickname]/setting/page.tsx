"use client"

import StackHeader from "@/components/layouts/Header/StackHeader"
import EditForm from "@/components/profile/EditForm"
import useEditProfile from "@/hooks/profile/useEditProfile"
import useProfileForEdit from "@/hooks/profile/useProfileForEdit"
import { ProfileForEditRequest } from "@/types/member"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProfileSettingPage = () => {
  const { data, isPending } = useProfileForEdit()
  const [profileData, setProfileData] = useState<ProfileForEditRequest>({
    memberUpdateRequest: {
      nickname: "",
      weight: 0,
      stateMessage: "",
      disclosureStatus: "ALL",
    },
    image: null,
  })
  const { mutate: edit } = useEditProfile()
  const router = useRouter()

  const handleSumbit = () => {
    edit(profileData)
    router.replace(`/profile/${profileData.memberUpdateRequest.nickname}`)
  }

  useEffect(() => {
    if (data) {
      setProfileData({
        ...profileData,
        memberUpdateRequest: {
          nickname: data.nickname,
          weight: data.weight,
          stateMessage: data.stateMessage,
          disclosureStatus: data.disclosureStatus as "ALL" | "ONLY_ME",
        },
      })
    }
  }, [data])

  return (
    <div>
      <StackHeader
        title="프로필 편집"
        supplement={
          <button className="cursor-pointer" onClick={handleSumbit}>
            완료
          </button>
        }
      />

      {isPending || !data ? (
        <div>Loading...</div>
      ) : (
        <EditForm
          initProfileData={data!}
          profileData={profileData}
          onChange={setProfileData}
        />
      )}
    </div>
  )
}

export default ProfileSettingPage
