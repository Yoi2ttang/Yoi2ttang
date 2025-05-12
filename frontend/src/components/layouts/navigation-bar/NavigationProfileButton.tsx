"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import useProfileForEdit from "@/hooks/profile/useProfileForEdit"
import Image from "next/image"

interface NavigationProfileButtonProps {
  href: string
  label: string
}

const NavigationProfileButton = ({
  href,
  label,
}: NavigationProfileButtonProps) => {
  const pathname = usePathname()
  const { data, isPending } = useProfileForEdit()
  const isActive = pathname.startsWith(href)

  return (
    <Link
      href={`${href}/${data?.nickname}`}
      className="flex flex-col items-center gap-0.5">
      {isPending || !data?.profileImageUrl ? (
        <div className="size-7 rounded-full bg-neutral-300" />
      ) : (
        <Image
          src={data.profileImageUrl}
          alt=""
          width={32}
          height={32}
          className={cn(
            "size-7 rounded-full border object-cover",
            isActive ? "border-yoi-500" : "border-neutral-300",
          )}
        />
      )}

      <p
        className={cn(
          "text-xs",
          isActive ? "text-yoi-500" : "text-neutral-300",
        )}>
        {label}
      </p>
    </Link>
  )
}

export default NavigationProfileButton
