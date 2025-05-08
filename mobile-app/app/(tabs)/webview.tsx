import { useEffect, useRef, useState } from "react"
import { BackHandler, Platform, StatusBar } from "react-native"
import { WebView } from "react-native-webview"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Location from "expo-location"

const WebViewScreen = () => {
  const router = useRouter()
  const webViewRef = useRef<WebView>(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [injectedJS, setInjectedJS] = useState("")

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
      router.replace("/running/onboarding")
    }
  }

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.warn("Permission denied for location")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords
      console.log("sds", location)

      const script = `
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "location",
        payload: {
          lat: ${latitude},
          lng: ${longitude}
        }
      }));
    `
      setInjectedJS(script)
    }

    fetchLocation()
  }, [])

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
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
        injectedJavaScript={injectedJS}
        className="flex-1"
      />
    </SafeAreaView>
  )
}

export default WebViewScreen
