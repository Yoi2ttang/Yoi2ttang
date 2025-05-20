import BlockIcon from "@/assets/icons/profile/block-icon.svg"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { motion, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const RADIUS = 130

const OnboardCarouselStartItem = () => {
  const [angles, setAngles] = useState<number[]>(
    Array.from({ length: 12 }, (_, i) => (360 / 12) * i),
  )
  const [isVisible, setIsVisible] = useState(true)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1, // 요소가 10% 이상 보일 때 감지
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  useAnimationFrame((t) => {
    if (isVisible) {
      setAngles((prev) => prev.map((angle) => (angle + 0.1) % 360))
    }
  })

  return (
    <div
      ref={elementRef}
      className="mr-4 flex w-full shrink-0 flex-col gap-4 select-none">
      <motion.h1
        className="text-title-lg self-center"
        whileInView={{
          y: [20, 0],
          opacity: [0, 1],
          transition: {
            delay: 0.25,
            duration: 0.5,
          },
        }}>
        좌충우돌!
        <br />
        <span className="text-yoi-500">십이간지</span> 동물들의 타일 경쟁
      </motion.h1>

      <motion.div
        className="relative h-96"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}>
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = RADIUS * Math.cos(rad)
          const y = RADIUS * Math.sin(rad)
          const AnimalIcon = animalMetaData[animalNumberMap[i + 1]].icon

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 flex size-16 rounded-full"
              style={{
                transform: `translate(${x - 32}px, ${y - 32}px)`,
              }}>
              <AnimalIcon className="size-16" />
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}>
        <BlockIcon className="text-yoi-400 size-28" />
      </motion.div>
    </div>
  )
}

export default OnboardCarouselStartItem
