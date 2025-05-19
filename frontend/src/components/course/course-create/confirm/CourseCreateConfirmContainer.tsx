import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import { motion } from "framer-motion"
import Image from "next/image"

interface CourseCreateConfirmContainerProps {
  imageUrl: string
  courseName: string
  onPrevStep: () => void
}

const CourseCreateConfirmContainer = ({
  imageUrl,
  onPrevStep,
  courseName,
}: CourseCreateConfirmContainerProps) => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-neutral-50 to-neutral-100">
      <StackHeader onClick={onPrevStep} title={"코스 확인"} />
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Section title={``}>
            <div className="flex flex-col items-center gap-6">
              {imageUrl ? (
                <div className="relative aspect-square w-full max-w-96 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={imageUrl}
                    alt="course image"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full max-w-96 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 shadow-md">
                  <p className="text-neutral-400">이미지 없음</p>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-title-md mb-1 text-neutral-600 italic">
                  {`" ${courseName} "`}
                </h3>
                <p className="text-sm text-neutral-400">코스 이름</p>
              </div>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  )
}

export default CourseCreateConfirmContainer
