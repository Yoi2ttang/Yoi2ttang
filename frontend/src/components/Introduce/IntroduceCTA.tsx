import { motion } from "framer-motion"
import Image from "next/image"

interface IntroduceCTAProps {}

const IntroduceCTA = ({}: IntroduceCTAProps) => {
  return (
    <section className="relative px-6 py-20 md:px-10">
      <div className="from-yoi-400 to-yoi-600 absolute inset-0 z-0 bg-gradient-to-tr"></div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <h2 className="mb-4 text-3xl font-bold text-white">
            지금 바로 요이땅 시작하세요!
          </h2>
          <p className="mb-8 text-lg text-white/90">
            일상을 즐겁게만 바꿔주는 건강 습관
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="text-yoi-500 rounded-full bg-white px-8 py-4 text-lg font-medium shadow-xl">
            지금 다운로드
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
          <Image
            src="/qr-code.png"
            alt="QR 코드"
            width={150}
            height={150}
            className="rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default IntroduceCTA
