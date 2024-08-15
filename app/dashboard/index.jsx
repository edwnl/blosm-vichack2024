import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Dashboard</Text>
      <Text style={styles.subtitle}>Your garden is growing!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    marginBottom: 10,
    color: "#5E9020",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "#666",
  },
});

export default Dashboard;
