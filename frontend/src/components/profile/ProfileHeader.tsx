import SettingIcon from "@/assets/icons/profile/setting-icon.svg"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

const ProfileHeader = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-title-md flex-1">프로필</p>

      <div className="flex gap-4">
        <Link href="/profile/search" className="size-6 cursor-pointer">
          <SearchIcon className="size-full stroke-neutral-800" />
        </Link>

        <Link href="/setting" className="size-6 cursor-pointer">
          <SettingIcon className="size-full stroke-neutral-800" />
        </Link>
      </div>
    </div>
  )
}

export default ProfileHeader
