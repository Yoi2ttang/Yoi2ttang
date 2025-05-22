import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import ShoesIcon from "@/assets/icons/navigation-bar/shoes-icon.svg"
import { motion } from "framer-motion"
import { ChartLineIcon, RouteIcon } from "lucide-react"

interface IntroduceFeaturesProps {}

const IntroduceFeatures = ({}: IntroduceFeaturesProps) => {
  const features = [
    {
      title: "12간지 팀",
      description: "나의 띠로 구성된 팀에 참여할 수 있어요",
      icon: <PeopleIcon className="size-7" />,
    },
    {
      title: "땅 따먹기",
      description: "런닝을 할 때마다 땅을 따먹을 수 있어요",
      icon: <ShoesIcon className="size-7 text-white" />,
    },
    {
      title: "코스",
      description: "다양한 코스로 런닝을 즐겨보세요",
      icon: <RouteIcon className="size-7" />,
    },
    {
      title: "통계",
      description: "런닝 활동 통계를 확인할 수 있어요",
      icon: <ChartLineIcon />,
    },
  ]

  return (
    <section className="relative px-6 py-24 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          주요 특징
        </h2>
        <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
          런닝이 즐거워지는 이유
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center rounded-3xl border border-gray-100/30 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/50">
            <div className="from-yoi-500 to-yoi-300 shadow-yoi-500/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr text-white shadow-lg">
              {feature.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default IntroduceFeatures
