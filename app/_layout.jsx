import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Slot, usePathname } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NerkoOne: require("../assets/fonts/NerkoOne-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathname = usePathname();

  useEffect(() => {
    fadeAnim.setValue(0); // Reset the animation value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200, // Slightly longer duration for a smoother effect
      useNativeDriver: true,
    }).start();
  }, [pathname]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Slot />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: width * 0.05,
  },
});
