"use client"

import { View, Text, Pressable } from "react-native"
import { useRouter } from "expo-router"

const RunningStartScreen = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <View className="flex-1 pt-[60px] px-5 bg-white">
      <View className="flex-row items-center gap-3 mb-5">
        <Pressable onPress={handleBack}>
          <Text className="text-[24px] text-yoi-500">←</Text>
        </Pressable>
        <Text className="text-[20px] font-semibold">러닝 시작</Text>
      </View>
    </View>
  )
}

export default RunningStartScreen
