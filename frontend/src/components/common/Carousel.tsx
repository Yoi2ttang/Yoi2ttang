"use client"

import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ReactNode, useCallback, useEffect, useState } from "react"

interface CarouselProps {
  loop?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  scrollCount?: number // 즉시 이동 버튼이 필요하다면 children의 length 만큼 설정
  dragFree?: boolean
  skipSnaps?: boolean
  className?: string
  children: ReactNode
}

const Carousel = ({
  loop = false,
  autoplay = false,
  autoplayDelay = 5000,
  scrollCount = 0,
  dragFree = false,
  skipSnaps = false,
  className,
  children,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start", dragFree, skipSnaps },
    autoplay
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
      : [],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  // emblaApi의 캐러셀 인덱스를 설정하는 함수
  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return
      }

      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  // emblaApi가 가리키는 인덱스를 상태로 set하는 함수
  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return
    }

    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    handleSelect()

    // select(슬라이드가 완전히 정지 되었을 때 발생) 이벤트를 구독하여 슬라이드가 변경될 때마다 handleSelect 함수 호출
    emblaApi.on("select", handleSelect)
    return () => {
      emblaApi.off("select", handleSelect)
    }
  }, [emblaApi, handleSelect])

  return (
    <div className="flex flex-col gap-4">
      <div ref={emblaRef} className={cn("w-full overflow-hidden", className)}>
        <div className="flex gap-4">{children}</div>
      </div>

      {scrollCount > 0 && (
        <div className="flex justify-center gap-4">
          {Array.from({ length: scrollCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "size-3 rounded-full transition-transform ease-in-out",
                selectedIndex === index
                  ? "bg-yoi-500 scale-125"
                  : "bg-neutral-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
