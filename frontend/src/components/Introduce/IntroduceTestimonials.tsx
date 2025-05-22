import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import { testimonials } from "./IntroduceTestimonials.mock"

const IntroduceTestimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Listen to embla events
  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-6 py-24 md:px-10 dark:from-[#121212] dark:to-[#1a1a1a]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white">
        실제 사용자 후기
      </motion.h2>

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollPrev}
          className="hover:text-yoi-500 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100/30 bg-white/70 text-gray-400 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-gray-900/50">
          &lt;
        </motion.button>

        <div className="w-full max-w-xl overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map(({ name, profile, content, highlight }) => (
              <motion.div
                key={name}
                className="min-w-0 shrink-0 grow-0 basis-full px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
                <div className="relative rounded-3xl border border-gray-100/30 bg-white/80 p-10 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/50">
                  <div className="from-yoi-200 to-yoi-50 dark:from-yoi-900 dark:to-yoi-950 absolute top-0 left-0 -z-10 h-full w-full rounded-3xl bg-gradient-to-tr opacity-10"></div>
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={profile}
                      alt="사용자 프로필"
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white shadow-xl dark:border-gray-800"
                    />
                  </div>
                  <p className="mb-6 text-center text-lg text-gray-700 dark:text-gray-300">
                    요이땅에서{" "}
                    <span className="text-yoi-500 font-semibold">
                      {highlight}
                    </span>
                    . {content}
                  </p>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    - {name} -
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollNext}
          className="hover:text-yoi-500 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100/30 bg-white/70 text-gray-400 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-gray-900/50">
          &gt;
        </motion.button>
      </div>

      <div className="mt-10 flex justify-center gap-3">
        {testimonials.map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-3 w-3 cursor-pointer rounded-full ${i === selectedIndex ? "bg-yoi-500 scale-125" : "bg-gray-300 dark:bg-gray-700"}`}></motion.span>
        ))}
      </div>

      {/* Background elements */}
      <div className="bg-yoi-100 dark:bg-yoi-900 absolute top-1/4 left-10 h-64 w-64 rounded-full opacity-20 blur-3xl"></div>
      <div className="bg-yoi-100 dark:bg-yoi-900 absolute right-10 bottom-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"></div>
    </section>
  )
}

export default IntroduceTestimonials
