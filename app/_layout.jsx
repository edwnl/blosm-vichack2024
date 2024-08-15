import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import Navbar from "../components/Navbar";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NerkoOne: require("../assets/fonts/NerkoOne-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <Navbar />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
