"use client"

import { useEffect, useState } from "react"
import { View, Text, BackHandler, Platform } from "react-native"
import { useRouter } from "expo-router"

const RunningStartScreen = () => {
  const router = useRouter()
  const [count, setCount] = useState(3)

  // 안드로이드 하드웨어 뒤로가기 막기
  useEffect(() => {
    const backAction = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    if (count === 0) return

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count])

  useEffect(() => {
    if (count === 0) {
      const navTimer = setTimeout(() => {
        router.replace("/running")
      }, 100)

      return () => clearTimeout(navTimer)
    }
  }, [count])

  return (
    <View className="flex-1 justify-center items-center bg-black">
      {count > 0 && (
        <Text className="text-[200px] font-bold text-white">{count}</Text>
      )}
    </View>
  )
}

export default RunningStartScreen
