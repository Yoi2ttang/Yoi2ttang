import { Tabs } from "expo-router"
import { Platform } from "react-native"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            display: "none",
          },
          android: {
            display: "none",
          },
        }),
      }}>
      <Tabs.Screen
        name="webview"
        options={{
          title: "Web",
        }}
      />
      <Tabs.Screen
        name="running/index"
        options={{
          title: "Running",
        }}
      />
    </Tabs>
  )
}

export default TabLayout
