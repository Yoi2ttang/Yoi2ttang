"use client"

import { throttle } from "lodash-es"
import { useEffect, useRef, useState } from "react"

const useResizeCourseCreateButton = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      // 스크롤 시작 시, 버튼 확장
      setIsExpanded(true)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // 0.5초 후 축소
      timerRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 500)
    }

    const handleResizeWithThrottle = throttle(handleResize, 400)
    window.addEventListener("scroll", handleResizeWithThrottle)
    return () => {
      window.removeEventListener("scroll", handleResizeWithThrottle)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return { isExpanded }
}

export default useResizeCourseCreateButton
