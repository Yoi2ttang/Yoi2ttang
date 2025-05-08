import { Link, Stack } from "expo-router"
import { View, Text } from "react-native"
import { styled } from "nativewind"

const ThemedView = styled(View)
const ThemedText = styled(Text)

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="flex-1 items-center justify-center p-5">
        <ThemedText className="text-xl font-bold text-center">
          This screen doesn't exist.
        </ThemedText>
        <Link href="/webview" asChild>
          <ThemedText className="mt-4 py-4 text-blue-500 font-semibold">
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

export default NotFoundScreen
