import { motion } from "framer-motion"
import Image from "next/image"

interface IntroduceAppPreviewProps {}

const IntroduceAppPreview = ({}: IntroduceAppPreviewProps) => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white px-6 py-24 md:px-10 dark:from-[#1a1a1a] dark:to-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          앱 미리보기
        </h2>
        <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
          직접 사용해보고 싶다면
        </p>
      </motion.div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative">
          <div className="from-yoi-400 to-yoi-200 absolute inset-0 -z-10 animate-pulse rounded-[56px] bg-gradient-to-tr opacity-30 blur-3xl"></div>
          <div className="relative transform transition-all duration-700 perspective-[1000px] hover:rotate-x-12 hover:rotate-y-6">
            <Image
              src="/app-screenshot-home.png"
              alt="요이땅 앱 스크린샷"
              width={350}
              height={700}
              className="h-auto rounded-[40px] border-8 border-white shadow-2xl dark:border-gray-800"
            />
            <div className="bg-yoi-300 absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full opacity-60 mix-blend-multiply blur-xl"></div>
            <div className="bg-yoi-200 absolute -bottom-4 -left-4 h-24 w-24 animate-pulse rounded-full opacity-60 mix-blend-multiply blur-xl delay-700"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default IntroduceAppPreview
