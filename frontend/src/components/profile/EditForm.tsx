"use client"

import CameraIcon from "@/assets/icons/profile/camera-icon.svg"
import KakaoIcon from "@/assets/icons/provider/kakao-icon.svg"
import useCheckNickname from "@/hooks/auth/useCheckNickname"
import { cn } from "@/lib/utils"
import { ProfileData } from "@/types/profile"
import { debounce } from "lodash-es"
import { Calendar } from "lucide-react"
import { ChangeEvent, useState } from "react"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import { Switch } from "../ui/switch"

const EditForm = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: "",
    profileImage: "",
    statusMessage: "",
    isPublic: false,
  })
  const { message, messageType } = useCheckNickname(profileData.nickname)

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, nickname: e.target.value })
  }, 300)

  return (
    <div className="flex flex-col gap-12 p-6">
      {/* 프로필 사진 */}
      <div className="flex justify-center">
        <div className="relative size-25 rounded-full bg-neutral-200">
          <button className="absolute right-0 bottom-0 cursor-pointer rounded-full border border-neutral-200 bg-white p-1">
            <CameraIcon className="size-5" />
          </button>
        </div>
      </div>

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
            onChange={handleChange}
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
        <Input value="70" />
      </div>

      {/* 상태 메시지 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">상태 메시지</p>
        <Textarea
          content={profileData.statusMessage}
          onContentChange={(content) =>
            setProfileData({ ...profileData, statusMessage: content })
          }
        />
      </div>

      {/* 프로필 공개 여부 */}
      <div className="flex flex-col gap-2">
        <p className="text-title-sm">프로필 공개 여부</p>
        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-yoi-500 scale-125"
            onCheckedChange={(checked) =>
              setProfileData({ ...profileData, isPublic: checked })
            }
          />
          <p>{profileData.isPublic ? "공개" : "비공개"}</p>
        </div>
      </div>
    </div>
  )
}

export default EditForm
