import { motion } from "framer-motion"
import Image from "next/image"

interface IntroduceHeroProps {}

const IntroduceHero = ({}: IntroduceHeroProps) => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center gap-10 overflow-hidden px-6 py-24 md:flex-row md:px-10 md:py-32">
      <div className="z-10 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <h1 className="from-yoi-600 to-yoi-400 mb-4 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
            요이땅
          </h1>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            걷기와 일상기록{" "}
            <span className="text-yoi-500 font-semibold">재미있게</span>{" "}
            즐기세요! 건강한 걸음 한 걸음마다 호적되어 재미로 바꿉니다!
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(255, 84, 52, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="text-md from-yoi-500 to-yoi-400 shadow-yoi-500/20 hover:shadow-yoi-500/30 rounded-full bg-gradient-to-tr px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl">
            지금 다운로드
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="z-10 flex justify-center md:w-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}>
        <div className="relative h-auto w-80 rotate-x-12 rotate-y-6 transform transition-transform duration-700 perspective-[1000px] hover:rotate-x-0 hover:rotate-y-0">
          <div className="from-yoi-300 to-yoi-100 absolute inset-0 -z-10 animate-pulse rounded-[40px] bg-gradient-to-tr opacity-30 shadow-2xl blur-3xl"></div>
          <Image
            src="/app-screenshot-map.png"
            alt="요이땅 앱 스크린샷"
            width={400}
            height={800}
            className="h-auto w-full rounded-[40px] border-8 border-white shadow-2xl dark:border-gray-800"
          />
          <div className="from-yoi-500 to-yoi-300 absolute -top-6 -right-6 h-12 w-12 animate-bounce rounded-full bg-gradient-to-tr shadow-xl delay-300"></div>
          <div className="from-yoi-300 to-yoi-100 absolute -bottom-4 -left-4 h-8 w-8 animate-bounce rounded-full bg-gradient-to-tr shadow-xl delay-700"></div>
        </div>
      </motion.div>
      {/* Organic shapes background */}
      <div className="from-yoi-100 to-yoi-50]opacity-60 absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br blur-3xl"></div>
      <div className="from-yoi-100 to-yoi-50]opacity-50 absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr blur-3xl"></div>
    </section>
  )
}

export default IntroduceHero
