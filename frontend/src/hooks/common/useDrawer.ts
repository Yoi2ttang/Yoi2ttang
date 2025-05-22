"use client"

import { useEffect } from "react"

interface UseDrawerProps {
  key: string
  isOpen: boolean
  onClose?: () => void
}

const useDrawer = ({ key, isOpen, onClose }: UseDrawerProps) => {
  useEffect(() => {
    const handlePopstate = () => {
      onClose?.()
    }

    window.addEventListener("popstate", handlePopstate)
    return () => {
      window.removeEventListener("popstate", handlePopstate)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ key }, "", window.location.href)
    } else {
      if (window.history.state.key === key) {
        window.history.back()
      }
    }
  }, [isOpen])
}

export default useDrawer
