import {
  animalIconMap,
  animalNumberMap,
  animalTeamNameMap,
  textClassMap,
} from "@/constants/animals"
import Button from "../common/Button"
import { SignUpData } from "@/types/auth"
import { AnimalType } from "@/types/animal"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TeamSelectionFormProps {
  signupData: SignUpData
  onNext: () => void
}

const TeamSelectionForm = ({ signupData, onNext }: TeamSelectionFormProps) => {
  const animalKey = animalNumberMap[
    Number(signupData.birth.year) % 12
  ] as AnimalType
  const AnimalIcon = animalIconMap[animalKey]

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <h1 className="text-title-md mt-12">
        {signupData.nickname}님은
        <br />
        <span className="text-yoi-500">{animalTeamNameMap[animalKey]}</span>이
        데리고 갔어요
      </h1>

      <div className="relative size-fit self-center">
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
          <AnimalIcon className="size-full object-cover" />
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
          className={cn(
            `absolute top-0 left-0 text-lg font-semibold ${textClassMap[animalKey]}`,
          )}>
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
          className={cn(
            `absolute top-0 right-0 text-lg font-semibold ${textClassMap[animalKey]}`,
          )}>
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
