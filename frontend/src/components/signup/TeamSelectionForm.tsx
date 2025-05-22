"use client"

import {
  animalMetaData,
  animalNumberMap,
  animalTeamNameMap,
} from "@/constants/animals"
import { getPayload } from "@/lib/auth/util"
import { cn } from "@/lib/utils"
import { AnimalType } from "@/types/animal"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Button from "../common/Button"

interface TeamSelectionFormProps {
  onNext: () => void
}

const TeamSelectionForm = ({ onNext }: TeamSelectionFormProps) => {
  const [nickname, setNickname] = useState("")
  const [animalKey, setAnimalKey] = useState<AnimalType | null>(null)

  useEffect(() => {
    const payload = getPayload()
    if (payload) {
      setNickname(payload.nickname)
      setAnimalKey(animalNumberMap[payload.zodiacId])
    }
  }, [])

  const AnimalIcon = animalKey ? animalMetaData[animalKey].icon : null

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <h1 className="text-title-md mt-12">
        <div className="flex items-center">
          <p className="line-clamp-1 break-all">{nickname}</p>
          <p className="shrink-0">님은</p>
        </div>
        <span className="text-yoi-500">
          {animalKey ? animalTeamNameMap[animalKey] : ""}
        </span>{" "}
        팀이 데리고 갔어요
      </h1>

      <div
        className={cn(
          `relative size-fit self-center`,
          animalKey ? animalMetaData[animalKey].textColor : "",
        )}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            rotate: [-8, 0, 8, 0, -8],
          }}
          transition={{
            scale: {
              duration: 0.2,
              ease: "easeInOut",
              delay: 0.5,
            },
            rotate: {
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          className="size-72">
          {AnimalIcon && <AnimalIcon className="size-full object-cover" />}
        </motion.div>

        <motion.p
          initial={{ rotate: 350 }}
          animate={{
            scale: [0, 1],
          }}
          transition={{
            scale: {
              duration: 1,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
          className="absolute top-0 left-0 text-lg font-semibold">
          반가워요~
        </motion.p>

        <motion.p
          initial={{ rotate: 10 }}
          animate={{
            scale: [0, 1],
          }}
          transition={{
            scale: {
              duration: 1,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="absolute top-0 right-0 text-lg font-semibold">
          열심히 달려봐요
        </motion.p>
      </div>

      <Button className="w-full" onClick={onNext}>
        달리러 가기
      </Button>
    </div>
  )
}

export default TeamSelectionForm
