"use client"

import StackHeader from "@/components/layouts/Header/StackHeader"
import EditForm from "@/components/profile/EditForm"
import useCheckNickname from "@/hooks/auth/useCheckNickname"
import useEditProfile from "@/hooks/profile/useEditProfile"
import useProfileForEdit from "@/hooks/profile/useProfileForEdit"
import { cn } from "@/lib/utils"
import { ProfileForEditRequest } from "@/types/member"
import { useEffect, useMemo, useState } from "react"

const ProfileSettingPage = () => {
  const { data, isLoading } = useProfileForEdit()
  const [profileData, setProfileData] = useState<ProfileForEditRequest>({
    memberUpdateRequest: {
      nickname: "",
      weight: 0,
      stateMessage: "",
      disclosureStatus: "ALL",
    },
    image: null,
  })
  const { message, messageType } = useCheckNickname(
    profileData.memberUpdateRequest.nickname,
    data?.nickname || "",
  )
  const { mutate: edit } = useEditProfile()

  const handleEdit = () => {
    if (data?.memberId) {
      edit({
        data: profileData,
        memberId: data.memberId,
        isNicknameChanged:
          profileData.memberUpdateRequest.nickname !== data?.nickname,
      })
    }
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

  const canEdit = useMemo(() => {
    return (
      messageType === "valid" && // 유효한 닉네임이고,
      profileData.memberUpdateRequest.nickname && // 닉네임이 있고,
      (profileData.image || // 프로필 이미지가 변경 되거나
        profileData.memberUpdateRequest.nickname !== data?.nickname || // 닉네임이 변경 되거나
        profileData.memberUpdateRequest.weight !== data?.weight || // 체중이 변경 되거나
        profileData.memberUpdateRequest.stateMessage !== data?.stateMessage || // 상태 메시지가 변경 되거나
        profileData.memberUpdateRequest.disclosureStatus !==
          data?.disclosureStatus) // 프로필 공개 여부가 변경 되었을 때
    )
  }, [messageType, data, profileData])

  return (
    <div>
      <StackHeader
        title="프로필 편집"
        supplement={
          <button
            className={cn(
              "cursor-pointer pr-1",
              canEdit ? "text-yoi-500" : "text-neutral-200",
            )}
            disabled={!canEdit}
            onClick={handleEdit}>
            완료
          </button>
        }
      />

      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <EditForm
          initProfileData={data!}
          profileData={profileData}
          onChange={setProfileData}
          message={message}
          messageType={messageType}
        />
      )}
    </div>
  )
}

export default ProfileSettingPage
