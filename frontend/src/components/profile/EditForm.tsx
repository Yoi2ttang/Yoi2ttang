"use client"

import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import useCheckNickname from "@/hooks/auth/useCheckNickname"
import { cn } from "@/lib/utils"
import { MAX_WEIGHT, MIN_WEIGHT } from "@/types/auth"
import { ProfileData } from "@/types/profile"
import { clamp, debounce } from "lodash-es"
import { Calendar } from "lucide-react"
import { ChangeEvent, useState } from "react"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import { Switch } from "../ui/switch"
import ProfileImageUploader from "./ProfileImageUploader"

const EditForm = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    profileImage: null,
    nickname: "",
    weight: 0,
    stateMessage: "",
    disclosureStatus: "ALL",
  })
  const { message, messageType } = useCheckNickname(profileData.nickname)

  const handleProfileImageChange = (file: File) => {
    setProfileData({ ...profileData, profileImage: file })
  }

  const handleNicknameChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, nickname: e.target.value })
  }, 300)

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setProfileData({ ...profileData, weight: 0 })
      return
    } else if (value.length > 5) {
      return
    }

    const clampedWeight = clamp(
      Number(Number(value).toFixed(1)),
      MIN_WEIGHT,
      MAX_WEIGHT,
    )
    if (clampedWeight !== profileData.weight) {
      setProfileData({ ...profileData, weight: clampedWeight })
    }
  }

  const handleStateMessageChange = (stateMessage: string) => {
    setProfileData({ ...profileData, stateMessage })
  }

  return (
    <div className="flex flex-col gap-12 p-6">
      <ProfileImageUploader initImage="" onChange={handleProfileImageChange} />

      {/* 연동된 계정 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">연동된 계정</p>
        <div className="flex items-center gap-2">
          <KakaoIcon className="size-5" />
          <p>ssafy12@naver.com</p>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">닉네임</p>
        <div className="relative">
          <Input
            variant={messageType === "valid" ? "default" : "error"}
            placeholder="닉네임을 입력해 주세요"
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

      {/* 생년월일 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">생년월일</p>
        <Input
          value="1998-01-01"
          variant="disabled"
          Icon={<Calendar className="size-4" />}
          className="text-neutral-400"
          readOnly
        />
      </div>

      {/* 성별 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">성별</p>
        <Input
          value="남성"
          variant="disabled"
          className="text-neutral-400"
          readOnly
        />
      </div>

      {/* 체중(kg) */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">체중(kg)</p>
        <Input
          type="number"
          placeholder="미입력 시 평균 체중이 적용돼요"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          value={!profileData.weight ? "" : profileData.weight}
          onChange={handleWeightChange}
        />
      </div>

      {/* 상태 메시지 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">상태 메시지</p>
        <Textarea
          content={profileData.stateMessage}
          onContentChange={(content) => handleStateMessageChange(content)}
        />
      </div>

      {/* 프로필 공개 여부 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">프로필 공개 여부</p>
        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-yoi-500 scale-125"
            onCheckedChange={(checked) =>
              setProfileData({
                ...profileData,
                disclosureStatus: checked ? "ALL" : "ONLY_ME",
              })
            }
          />
          <p>{profileData.disclosureStatus === "ALL" ? "공개" : "비공개"}</p>
        </div>
      </div>
    </div>
  )
}

export default EditForm
