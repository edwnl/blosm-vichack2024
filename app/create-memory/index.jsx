import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import {
  CameraIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import Navbar from "../../components/Navbar";

const { width, height } = Dimensions.get("window");
const CAMERA_RATIO = 1; // Square ratio
const CAMERA_SIZE = Math.min(width, height) * 0.8;

const CreateMemoryPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  if (!permission) {
    return (
      <>
        <Navbar />
        <View style={styles.centerContainer}>
          <Text style={styles.message}>Requesting camera permission...</Text>
        </View>
      </>
    );
  }

  if (!permission.granted) {
    return (
      <>
        <Navbar />
        <View style={styles.centerContainer}>
          <Text style={styles.message}>
            We need your permission {"\n"}to use the camera :3
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const confirmPicture = () => {
    router.replace("/dashboard");
  };

  const cancelCapture = () => {
    router.replace("/dashboard");
  };

  return (
    <>
      <Navbar />
      <View style={{ marginVertical: 40 }}>
        <Text style={styles.welcomeText}>
          Create your {"\n"} <Text style={styles.gardenText}>memory</Text>.
        </Text>
      </View>

      <View style={styles.container}>
        {!capturedImage ? (
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              ref={cameraRef}
              ratio={`${CAMERA_RATIO}:1`}
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelCapture}
                >
                  <XMarkIcon size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <CameraIcon size={24} color="white" />
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage }} style={styles.preview} />
            <View style={styles.previewButtonsContainer}>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={retakePicture}
              >
                <ArrowPathIcon size={24} color="#5E9020" />
                <Text style={styles.previewButtonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={confirmPicture}
              >
                <CheckIcon size={24} color="#5E9020" />
                <Text style={styles.previewButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cameraContainer: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  captureButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5E9020",
    padding: 15,
    borderRadius: 10,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  previewContainer: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
  },
  previewButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    padding: 20,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  previewButton: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  previewButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#5E9020",
    marginTop: 5,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  button: {
    backgroundColor: "#5E9020",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat",
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
});

export default CreateMemoryPage;
