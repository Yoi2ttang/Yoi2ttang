import { useEffect, useRef, useState } from "react"
import { BackHandler, Platform, StatusBar } from "react-native"
import { WebView } from "react-native-webview"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const WebViewScreen = () => {
  const router = useRouter()
  const webViewRef = useRef<WebView>(null)
  const [canGoBack, setCanGoBack] = useState(false)

  const handleBackPress = () => {
    if (canGoBack) {
      webViewRef.current?.goBack()
      return true
    } else {
      router.back()
      return true
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress,
    )
    return () => backHandler.remove()
  }, [canGoBack])

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack)
    if (navState.url.endsWith("/running")) {
      router.replace("/running")
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <WebView
        ref={webViewRef}
        source={{ uri: "http://70.12.246.158:3000" }}
        onNavigationStateChange={handleNavigationStateChange}
        className="flex-1"
      />
    </SafeAreaView>
  )
}

export default WebViewScreen
