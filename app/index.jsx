import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { UserIcon } from "react-native-heroicons/outline";
import Navbar from "../components/Navbar";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("username"); // 'username', 'newPassword', or 'existingPassword'
  const [error, setError] = useState("");
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const validateUsername = (username) => {
    return true;
  };

  const validatePassword = (password) => {
    return true;
  };

  const handleUsernameSubmit = () => {
    if (!validateUsername(username)) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    setError("");
    // Simulating a check if the user exists
    const userExists = Math.random() < 0.5;
    fadeToNextStage(userExists ? "existingPassword" : "newPassword");
  };

  const handlePasswordSubmit = () => {
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    console.log(
      stage === "newPassword" ? "Signing up:" : "Logging in:",
      username,
      password,
    );

    router.replace("/dashboard");
  };

  const handleSubmit = () => {
    if (stage === "username") {
      handleUsernameSubmit();
    } else {
      handlePasswordSubmit();
    }
  };

  const fadeToNextStage = (nextStage) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setStage(nextStage);
      setError(""); // Clear any existing errors when changing stages
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const getSupportingText = () => {
    switch (stage) {
      case "username":
        return "Enter a username to continue. If it doesn't exist, we'll sign you up!";
      case "newPassword":
        return "No one has this username! Set a password and we'll create an account for you!";
      case "existingPassword":
        return "Welcome back! Enter your password and we'll log you in!";
    }
  };

  return (
    <>
      <Navbar />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          Welcome to{"\n"}your <Text style={styles.gardenText}>garden</Text>.
        </Text>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.supportingText}>{getSupportingText()}</Text>
          <View style={styles.inputContainer}>
            {stage === "username" ? (
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError(""); // Clear error when user types
                }}
                onSubmitEditing={handleSubmit}
              />
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(""); // Clear error when user types
                }}
                onSubmitEditing={handleSubmit}
              />
            )}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                (!validateUsername(username) && stage === "username") ||
                (!validatePassword(password) && stage !== "username")
                  ? styles.buttonDisabled
                  : {},
              ]}
              onPress={handleSubmit}
              disabled={
                (!validateUsername(username) && stage === "username") ||
                (!validatePassword(password) && stage !== "username")
              }
            >
              <UserIcon size={15} color="white" />
              <Text style={styles.buttonText}>
                {stage === "username"
                  ? "Next"
                  : stage === "newPassword"
                    ? "Sign Up"
                    : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingVertical: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: "Montserrat",
    textAlign: "center",
    marginBottom: 15,
  },
  gardenText: {
    fontFamily: "MontserratBold",
    color: "#5E9020",
  },
  supportingText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    width: "80%",
    alignSelf: "center",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#5E9020",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat",
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default LoginPage;
