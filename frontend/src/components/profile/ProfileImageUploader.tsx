"use client"

import CameraIcon from "@/assets/icons/profile/camera-icon.svg"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"

interface ProfileImageUploaderProps {
  initImage?: string
  onChange: (file: File) => void
  className?: string
}

const ProfileImageUploader = ({
  initImage,
  onChange,
  className,
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
    <div className={cn("relative h-44 drop-shadow-xl", className)}>
      {initImage ? (
        <Image
          src={previewImage}
          alt=""
          fill
          className="object-cover opacity-15"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-100" />
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
        <div className="relative size-28 rounded-full border border-neutral-100">
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
            <CameraIcon className="size-5 text-neutral-800" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileImageUploader
