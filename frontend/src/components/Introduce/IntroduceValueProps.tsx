import { motion } from "framer-motion"
import Image from "next/image"

interface IntroduceValuePropsProps {}

const IntroduceValueProps = ({}: IntroduceValuePropsProps) => {
  const values = [
    {
      title: "행복한 걷기",
      description: "일상 속에서 즐거운 경험을 제공합니다",
      highlight: "즐거운 경험",
      image: "/walking-illustration.png",
    },
    {
      title: "운동 목표 달성",
      description: "매일 조금씩 목표를 달성해요",
      highlight: "목표를 달성",
      image: "/health-illustration.png",
    },
    {
      title: "함께하는 즐거움",
      description: "친구와 함께하면 더욱 즐거워요",
      highlight: "더욱 즐거워",
      image: "/friends-illustration.png",
    },
  ]

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          걷기가 재밌어 지는 순간
        </h2>
        <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
          요이땅으로 일상이 달라져요
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
        {values.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center">
            <motion.div
              className="relative mb-8 h-40 w-40"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className="from-yoi-100 dark:from-yoi-800 dark:to-yoi-950 absolute inset-0 -z-10 rounded-full bg-gradient-to-tr to-white opacity-60 blur-xl"></div>
              <Image
                src={item.image}
                alt={item.title}
                width={160}
                height={160}
                className="h-full w-full object-contain"
              />
            </motion.div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {item.description.split(item.highlight).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-yoi-500 font-semibold">
                      {item.highlight}
                    </span>
                  </span>
                ) : (
                  part
                ),
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Fluid background shapes */}
      <div className="from-yoi-100 absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-b to-transparent opacity-30 blur-3xl"></div>
      <div className="from-yoi-100 absolute bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-t to-transparent opacity-30 blur-3xl"></div>
    </section>
  )
}

export default IntroduceValueProps
