import { motion } from "framer-motion"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { ReactNode } from "react"

interface OnboardCarouselItemProps {
  title: ReactNode | string
  description?: ReactNode | string
  image1: StaticImport
  image2?: StaticImport
}

const OnboardCarouselItem = ({
  title,
  description,
  image1,
  image2,
}: OnboardCarouselItemProps) => {
  return (
    <div className="mr-4 flex w-full shrink-0 flex-col items-center gap-12 select-none">
      <div>
        <motion.h1
          className="text-title-md"
          whileInView={{
            y: [20, 0],
            opacity: [0, 1],
            transition: {
              delay: 0.5,
              duration: 1,
            },
          }}>
          {title}
        </motion.h1>

        <motion.p
          className="text-yoi-500 text-sm"
          whileInView={{
            opacity: [0, 1],
            transition: {
              delay: 1.3,
              duration: 1,
            },
          }}>
          {description}
        </motion.p>
      </div>

      <motion.div
        className="relative -mx-12 h-80 w-full"
        whileInView={{
          y: [20, 0],
          opacity: [0, 1],
          transition: {
            delay: 1,
            duration: 0.5,
          },
        }}>
        {image2 ? (
          <>
            <Image
              src={image1}
              alt=""
              className="absolute top-1/2 left-1/2 w-32 -translate-y-1/2 rounded-xl border-4 border-neutral-500 shadow-xl"
            />
            <Image
              src={image2}
              alt=""
              className="absolute top-1/2 left-1/2 w-32 -translate-x-full -translate-y-1/2 rotate-10 rounded-xl border-4 border-neutral-500 shadow-xl"
            />
          </>
        ) : (
          <Image
            src={image1}
            alt=""
            className="absolute top-1/2 left-1/2 w-32 -translate-x-1/2 -translate-y-1/2 rotate-10 rounded-xl border-4 border-neutral-500 shadow-xl"
          />
        )}
      </motion.div>
    </div>
  )
}

export default OnboardCarouselItem
