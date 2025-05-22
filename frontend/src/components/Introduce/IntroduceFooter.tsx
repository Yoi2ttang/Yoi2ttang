import { motion } from "framer-motion"

interface IntroduceFooterProps {}

const IntroduceFooter = ({}: IntroduceFooterProps) => {
  return (
    <footer className="border-t border-gray-100/30 bg-white/80 px-6 py-12 backdrop-blur-md md:px-10 dark:border-white/10 dark:bg-gray-900/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 dark:text-gray-400">
          요이땅 © 2025
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex gap-8 text-sm">
          {["이용약관", "개인정보처리방침", "서비스 안내", "문의하기"].map(
            (item, i) => (
              <a
                key={item}
                href="#"
                className="hover:text-yoi-500 text-gray-600 transition-colors duration-300 dark:text-gray-400">
                {item}
              </a>
            ),
          )}
        </motion.div>
      </div>
    </footer>
  )
}
export default IntroduceFooter
