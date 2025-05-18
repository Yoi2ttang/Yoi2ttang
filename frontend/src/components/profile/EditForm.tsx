"use client"

import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import { cn } from "@/lib/utils"
import { MAX_WEIGHT, MIN_WEIGHT } from "@/types/auth"
import {
  ProfileForEditRequest,
  ProfileForEditResponse,
} from "@/types/member/member.type"
import { clamp, debounce } from "lodash-es"
import { Calendar } from "lucide-react"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import { Switch } from "../ui/switch"
import ProfileImageUploader from "./ProfileImageUploader"

interface EditFormProps {
  initProfileData: ProfileForEditResponse
  profileData: ProfileForEditRequest
  onChange: (profileData: ProfileForEditRequest) => void
  message: string
  messageType: "valid" | "invalid"
}

const EditForm = ({
  initProfileData,
  profileData,
  onChange,
  message,
  messageType,
}: EditFormProps) => {
  const [nickname, setNickname] = useState(
    profileData.memberUpdateRequest.nickname,
  )

  const handleProfileImageChange = (file: File) => {
    onChange({ ...profileData, image: file })
  }

  const updateProfileData = useMemo(
    () =>
      debounce((value: string) => {
        onChange({
          ...profileData,
          memberUpdateRequest: {
            ...profileData.memberUpdateRequest,
            nickname: value,
          },
        })
      }, 300),
    [profileData],
  )

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    updateProfileData(value)
  }

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      onChange({
        ...profileData,
        memberUpdateRequest: { ...profileData.memberUpdateRequest, weight: 0 },
      })
      return
    } else if (value.length > 5) {
      return
    }

    const clampedWeight = clamp(
      Number(Number(value).toFixed(1)),
      MIN_WEIGHT,
      MAX_WEIGHT,
    )
    if (clampedWeight !== profileData.memberUpdateRequest.weight) {
      onChange({
        ...profileData,
        memberUpdateRequest: {
          ...profileData.memberUpdateRequest,
          weight: clampedWeight,
        },
      })
    }
  }

  const handleStateMessageChange = (stateMessage: string) => {
    onChange({
      ...profileData,
      memberUpdateRequest: {
        ...profileData.memberUpdateRequest,
        stateMessage,
      },
    })
  }

  useEffect(() => {
    if (initProfileData) {
      setNickname(initProfileData.nickname)
    }
  }, [initProfileData])

  return (
    <div className="flex flex-col gap-12 px-6">
      <ProfileImageUploader
        className="-mx-6"
        initImage={initProfileData.profileImageUrl}
        onChange={handleProfileImageChange}
      />

      <div className="flex flex-col gap-2">
        <p className="text-title-sm">연동된 계정</p>
        <div className="flex items-center gap-2">
          <KakaoIcon className="size-5" />
          <p>{initProfileData.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-title-sm">닉네임</p>
        <div className="relative">
          <Input
            variant={messageType === "valid" ? "default" : "error"}
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <p
            className={cn(
              "absolute top-full mt-1",
              messageType === "valid" ? "text-green-500" : "text-red-500",
            )}>
            {message}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-title-sm">생년월일</p>
        <Input
          value={initProfileData.birthdate}
          variant="disabled"
          Icon={<Calendar className="size-4" />}
          className="text-neutral-400"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-title-sm">성별</p>
        <Input
          value={initProfileData.gender === "MALE" ? "남성" : "여성"}
          variant="disabled"
          className="text-neutral-400"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-title-sm">체중(KG)</p>
        <Input
          type="number"
          placeholder="체중을 입력해 주세요"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={
            !profileData.memberUpdateRequest.weight
              ? ""
              : profileData.memberUpdateRequest.weight
          }
          onChange={handleWeightChange}
        />
      </div>

      {/* 상태 메시지 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">상태 메시지</p>
        <Textarea
          content={profileData.memberUpdateRequest.stateMessage}
          onContentChange={(content) => handleStateMessageChange(content)}
        />
      </div>

      {/* 프로필 공개 여부 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">프로필 공개 여부</p>
        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-yoi-500 scale-125"
            checked={profileData.memberUpdateRequest.disclosureStatus === "ALL"}
            onCheckedChange={(checked) =>
              onChange({
                ...profileData,
                memberUpdateRequest: {
                  ...profileData.memberUpdateRequest,
                  disclosureStatus: checked ? "ALL" : "ONLY_ME",
                },
              })
            }
          />
          <p>
            {profileData.memberUpdateRequest.disclosureStatus === "ALL"
              ? "공개"
              : "비공개"}
          </p>
        </div>
      </div>

      {/* 여백 */}
      <div />
    </div>
  )
}

export default EditForm
