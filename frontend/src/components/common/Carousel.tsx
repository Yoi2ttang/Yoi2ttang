"use client"

import { cn } from "@/lib/utils"
import useEmblaCarousel from "embla-carousel-react"
import { ReactNode } from "react"

interface CarouselProps {
  children: ReactNode
  className?: string
}

const Carousel = ({ children, className }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div ref={emblaRef} className={cn("w-full overflow-hidden", className)}>
      <div className="flex gap-4">{children}</div>
    </div>
  )
}

export default Carousel
