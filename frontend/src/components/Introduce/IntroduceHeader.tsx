import { motion } from "framer-motion"

interface IntroduceHeaderProps {}

const IntroduceHeader = ({}: IntroduceHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100/30 bg-white/80 px-6 py-5 backdrop-blur-md md:px-10 dark:border-white/10 dark:bg-black/70">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-yoi-500 text-2xl font-bold">
        요이땅
      </motion.div>
      <motion.button
        onClick={() => {
          window.open(
            "https://drive.google.com/drive/folders/19wyoeBws-6XZ_P7sgwzIRmn7ieErsqFU?usp=sharing",
            "_blank",
          )
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="from-yoi-500 to-yoi-400 shadow-yoi-500/20 hover:shadow-yoi-500/30 cursor-pointer rounded-full bg-gradient-to-tr px-5 py-2.5 text-sm text-white shadow-lg transition-all duration-300 hover:shadow-xl">
        지금 다운로드
      </motion.button>
    </header>
  )
}
export default IntroduceHeader
