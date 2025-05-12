import { useEffect, useRef, useState } from "react"
import { BackHandler, StatusBar } from "react-native"
import { WebView } from "react-native-webview"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Location from "expo-location"

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
      router.replace("/running/onboarding")
    }
  }

  // 위치 감지 및 1초마다 전송
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription

    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.warn("위치 권한 거부됨")
        return
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // 1초마다
          distanceInterval: 0, // 거리 관계없이 주기적으로
        },
        (location) => {
          const coords = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }

          console.log("📤 위치 업데이트:", coords)
          const message = JSON.stringify(coords)
          webViewRef.current?.postMessage(message)
        },
      )
    }

    startWatchingLocation()

    return () => {
      locationSubscription?.remove()
    }
  }, [])

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <WebView
        ref={webViewRef}
        source={{ uri: "http://70.12.246.158:3000" }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={(event) => {
          console.log("📩 웹에서 보낸 메시지:", event.nativeEvent.data)
        }}
        onLoadEnd={() => {
          console.log("✅ 웹 페이지 로드 완료")
        }}
        className="flex-1"
      />
    </>
  )
}

export default WebViewScreen
