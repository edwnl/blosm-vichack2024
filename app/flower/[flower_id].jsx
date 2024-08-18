import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  ClockIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import Svg, { Circle } from "react-native-svg";
import { BlurView } from "expo-blur";
import Flower1 from "../../assets/images/flowers/Flower1";

const { width, height } = Dimensions.get("window");

const FlowerDetailPage = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();

  // State for modal and flower name
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flowerName, setFlowerName] = useState("Sunflower");
  const [tempFlowerName, setTempFlowerName] = useState("");

  // Dummy data
  const friendData = {
    friendName: "Alex",
    level: 1,
    progress: 10,
    daysGrown: 7,
    wiltsIn: 2,
  };

  const CircularProgress = ({ progress }) => {
    const size = width * 0.25;
    const strokeWidth = size * 0.1;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressOffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.progressContainer}>
        <Svg
          width={size}
          height={size}
          style={{
            marginBottom: 2,
          }}
        >
          <Circle
            stroke="#E0E0E0"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#5E9020"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    );
  };

  const handleEditName = () => {
    setTempFlowerName(flowerName);
    setIsModalVisible(true);
  };

  const handleSaveName = () => {
    if (tempFlowerName.trim() !== "") {
      setFlowerName(tempFlowerName);
    }
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeftIcon size={20} color="#5E9020" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Flower1 width={width * 0.4} height={width * 0.4} />
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.nameAndEditContainer}>
            <Text style={styles.flowerName}>{flowerName}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditName}
            >
              <PencilIcon size={20} color="#5E9020" />
            </TouchableOpacity>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {friendData.level}</Text>
          </View>
        </View>

        <Text style={styles.growingWithText}>
          growing with{" "}
          <Text style={styles.friendNameText}>{friendData.friendName}</Text>
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.levelProgressBox}>
            <Text style={styles.statTitle}>Level Progress</Text>
            <CircularProgress progress={friendData.progress} />
          </View>

          <View style={styles.smallStatsContainer}>
            <View style={styles.smallStatBox}>
              <Text style={styles.statTitle}>Grown for</Text>
              <View style={styles.statValueContainer}>
                <CalendarIcon size={20} color="#5E9020" />
                <Text style={styles.statValue}>
                  {friendData.daysGrown} days
                </Text>
              </View>
            </View>

            <View style={styles.smallStatBox}>
              <Text style={styles.statTitle}>Wilts in</Text>
              <View style={styles.statValueContainer}>
                <ClockIcon size={20} color="#5E9020" />
                <Text style={styles.statValue}>{friendData.wiltsIn} hours</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/watering")}
          style={styles.waterButton}
        >
          <FaceSmileIcon size={20} color="white" />
          <Text style={styles.waterButtonText}>Water now!</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <BlurView style={styles.blurContainer} intensity={10}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit flower name</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <XMarkIcon size={24} color="#5E9020" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Enter new flower name"
              value={tempFlowerName}
              onChangeText={setTempFlowerName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveName}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#5E9020",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#5E9020",
    fontFamily: "Montserrat",
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: 10,
  },
  imageContainer: {
    width: width * 0.85,
    aspectRatio: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
    borderRadius: 10,
  },
  flowerImage: {
    width: "20%",
    height: "20%",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: height * 0.01,
  },
  nameAndEditContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flowerName: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    marginRight: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  levelBadge: {
    backgroundColor: "#5E9020",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  levelText: {
    color: "white",
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
  growingWithText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Montserrat",
    marginBottom: height * 0.02,
    alignSelf: "flex-start",
  },
  friendNameText: {
    textDecorationLine: "underline",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: height * 0.02,
  },
  levelProgressBox: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallStatsContainer: {
    width: "48%",
    justifyContent: "space-between",
  },
  smallStatBox: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    height: 75,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Montserrat",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: "#333",
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    color: "#333",
    marginLeft: 5,
  },
  waterButton: {
    backgroundColor: "#5E9020",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
  },
  waterButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "MontserratBold",
    marginLeft: 10,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    color: "#5E9020",
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Montserrat",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#5E9020",
  },
  saveButton: {
    backgroundColor: "#5E9020",
  },
  cancelButtonText: {
    color: "#5E9020",
    fontFamily: "Montserrat",
  },
  saveButtonText: {
    color: "white",
    fontFamily: "MontserratBold",
  },
});

export default FlowerDetailPage;
