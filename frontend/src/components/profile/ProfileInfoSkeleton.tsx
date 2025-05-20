const ProfileInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="size-15 animate-pulse rounded-full border border-neutral-100 bg-neutral-200 object-cover" />

        <div className="flex flex-1 flex-col gap-1">
          <div className="h-6 w-full animate-pulse rounded-xl bg-neutral-200" />
          <div className="h-5 w-1/3 animate-pulse rounded-xl bg-neutral-200" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-6 w-full animate-pulse rounded-xl bg-neutral-200" />
        <div className="h-6 w-full animate-pulse rounded-xl bg-neutral-200" />
        <div className="h-6 w-full animate-pulse rounded-xl bg-neutral-200" />
      </div>
    </div>
  )
}

export default ProfileInfoSkeleton
