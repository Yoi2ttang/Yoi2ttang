"use client"

import CameraIcon from "@/assets/icons/profile/camera-icon.svg"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"

interface ProfileImageUploaderProps {
  initImage?: string
  onChange: (file: File) => void
}

const ProfileImageUploader = ({
  initImage,
  onChange,
}: ProfileImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState(
    initImage || "/images/logo.svg",
  )
  const fileInput = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const objectURL = URL.createObjectURL(file)
      setPreviewImage(objectURL)
      onChange(file)
    }
  }

  const handleClick = () => {
    fileInput.current?.click()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-25 rounded-full bg-neutral-200">
        <Image
          src={previewImage}
          alt=""
          className="size-full rounded-full object-cover"
          fill
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={fileInput}
          hidden
          readOnly
        />

        <button
          className="absolute right-0 bottom-0 cursor-pointer rounded-full border border-neutral-200 bg-white p-1"
          onClick={handleClick}>
          <CameraIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}

export default ProfileImageUploader
