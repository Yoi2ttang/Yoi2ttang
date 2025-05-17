import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CourseCreateEndContainerProps {
  courseName?: string
  courseId?: string
}

const CourseCreateEndContainer = ({
  courseName = "새로운 코스",
  courseId,
}: CourseCreateEndContainerProps) => {
  const router = useRouter()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-12">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mb-8">
          <div className="rounded-full bg-[var(--color-yoi-50)] p-4">
            <CheckCircle size={64} className="text-[var(--color-yoi-500)]" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center">
          <h1 className="text-title-lg mb-2 text-[var(--color-yoi-900)]">
            코스 생성 완료!
          </h1>
          <p className="text-md mb-8 text-[var(--color-yoi-700)]">
            <span className="font-semibold">{courseName}</span> 코스가 <br />
            성공적으로
            <span className="font-semibold"> 생성 </span>되었습니다.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3">
          <button
            onClick={() =>
              courseId
                ? router.push(`/course/${courseId}`)
                : router.push("/course")
            }
            className="w-full rounded-xl bg-[var(--color-yoi-500)] py-4 font-semibold text-white transition-colors hover:bg-[var(--color-yoi-600)]">
            달리러 가기
          </button>

          <Link href="/course" className="block">
            <button className="w-full rounded-xl bg-[var(--color-yoi-50)] py-4 font-semibold text-[var(--color-yoi-700)] transition-colors hover:bg-[var(--color-yoi-100)]">
              코스 목록으로 돌아가기
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CourseCreateEndContainer
