"use client"

import Button from "@/components/common/Button"
import Carousel from "@/components/common/Carousel"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { motion, useAnimationFrame } from "framer-motion"
import { useState } from "react"
import BlockIcon from "@/assets/icons/profile/block-icon.svg"
import ScreenShotImage from "@/assets/images/onboard/temp-screenshot.png"
import Image from "next/image"

const RADIUS = 130

const OnboardPage = () => {
  const [angles, setAngles] = useState<number[]>(
    Array.from({ length: 12 }, (_, i) => (360 / 12) * i),
  )

  // 매 프레임마다 각도를 업데이트
  useAnimationFrame((t) => {
    setAngles((prev) => prev.map((angle) => (angle + 0.1) % 360))
  })

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Carousel>
          <div className="flex w-full shrink-0 flex-col gap-4">
            <motion.h1
              className="text-title-md"
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

            <div className="relative h-96">
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
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/8">
              <BlockIcon className="text-yoi-400 size-28" />
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-4 overflow-hidden">
            <motion.h1
              className="text-title-md"
              whileInView={{
                y: [20, 0],
                opacity: [0, 1],
                transition: {
                  delay: 0.25,
                  duration: 0.5,
                },
              }}>
              기록들을 한눈에
            </motion.h1>

            <motion.div
              className="relative h-72 object-cover px-4"
              whileInView={{
                y: [20, 0],
                opacity: [0, 1],
                transition: {
                  delay: 0.6,
                  duration: 0.5,
                },
              }}>
              <Image
                src={ScreenShotImage}
                alt=""
                className="rounded-xl border border-neutral-200"
              />
            </motion.div>
          </div>
        </Carousel>
      </div>

      <div className="px-4 pb-6">
        <Button className="w-full">지금 바로 달려들기</Button>
      </div>
    </div>
  )
}

export default OnboardPage
