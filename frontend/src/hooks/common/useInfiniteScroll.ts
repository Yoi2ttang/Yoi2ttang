import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query"
import { useEffect, useRef } from "react"

interface UseInfiniteScrollProps<TQueryFnData>
  extends UseInfiniteQueryOptions<TQueryFnData> {
  rootMargin?: string
  threshold?: number
}

const useInfiniteScroll = <TQueryFnData>(
  data: UseInfiniteScrollProps<TQueryFnData>,
) => {
  const {
    rootMargin = "0px",
    threshold = 0.25,
    enabled = true,
    ...params
  } = data
  const targetRef = useRef<HTMLDivElement>(null)
  const response = useInfiniteQuery({
    enabled,
    ...data,
  })

  useEffect(() => {
    if (!targetRef.current || !enabled) {
      return
    }

    const option = {
      rootMargin,
      threshold,
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && response.hasNextPage) {
        response.fetchNextPage()
      }
    }, option)

    observer.observe(targetRef.current)

    return () => observer.disconnect()
  }, [enabled, response])

  return { targetRef, ...response }
}

export default useInfiniteScroll
