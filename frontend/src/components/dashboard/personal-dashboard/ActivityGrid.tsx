import { cn } from "@/lib/utils"

interface ActivityGridProps {}

const ActivityGrid = ({}: ActivityGridProps) => {
  const grid = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => {
      const index = row * 10 + col

      return (
        <div
          key={`${index}`}
          className={cn("size-7 rounded-sm bg-neutral-200 transition-colors")}
        />
      )
    }),
  )

  return (
    <div className="flex h-full w-full flex-col gap-1 px-3">
      {grid.map((row, i) => (
        <div
          key={`${i}`}
          className="flex h-full w-full flex-1 justify-around gap-1">
          {row}
        </div>
      ))}
    </div>
  )
}

export default ActivityGrid
