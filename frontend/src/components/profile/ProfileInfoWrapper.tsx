"use client"

import { ProfileResponse } from "@/types/member"
import dynamic from "next/dynamic"

const ProfileInfo = dynamic(() => import("./ProfileInfo"), {
  ssr: false,
})

interface ProfileInfoWrappeProps {
  data: ProfileResponse
}

const ProfileInfoWrapper = (props: ProfileInfoWrappeProps) => {
  return <ProfileInfo data={props.data} />
}

export default ProfileInfoWrapper
