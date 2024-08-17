import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import Navbar from "../../components/Navbar";

const { width } = Dimensions.get("window");
const padding = 16;
const gap = 16;
const cardSize = (width - 5 * padding - gap) / 2;

// Dummy data for friends
const friendsData = [
  {
    id: "1",
    name: "Amy",
    flowerType: "Sunflower",
    flowerImage: require("../../assets/images/flowers/flower1.png"),
    lastSeen: "with Amy",
  },
  {
    id: "2",
    name: "Auri",
    flowerType: "Rose",
    flowerImage: require("../../assets/images/flowers/flower2.png"),
    lastSeen: "with Auri",
  },
  {
    id: "3",
    name: "Jack",
    flowerType: "Tulip",
    flowerImage: require("../../assets/images/flowers/flower3.png"),
    lastSeen: "last seen",
  },
  {
    id: "4",
    name: "Thomas",
    flowerType: "Daisy",
    flowerImage: require("../../assets/images/flowers/flower4.png"),
    lastSeen: "adventure",
  },
];

const FriendItem = ({ item, onPress }) => (
  <View style={styles.friendItemContainer}>
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => onPress(item.name)}
    >
      <Image source={item.flowerImage} style={styles.flowerImage} />
    </TouchableOpacity>
    <Text style={styles.flowerType}>{item.flowerType}</Text>
    <Text style={styles.lastSeen}>{item.lastSeen}</Text>
  </View>
);

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleAddFriend = () => {
    if (username.trim() === "") {
      setMessage("Please enter a username");
      return;
    }

    // Simulate 80% chance of user existing
    const userExists = Math.random() < 0.8;

    if (userExists) {
      setIsSuccess(true);
      setMessage("Friend added successfully!");
      setTimeout(() => {
        setIsModalVisible(false);
        setUsername("");
        setMessage("");
        setIsSuccess(false);
      }, 2000);
    } else {
      setIsSuccess(false);
      setMessage("User not found. Please try again.");
    }
  };

  const navigateToFriendDetail = (name) => {
    router.push(`/friend/${name}`);
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>
          Manage your{"\n"}
          <Text style={styles.gardenTitle}>garden</Text>.
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <MagnifyingGlassIcon size={20} color="#5E9020" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={friendsData}
          renderItem={({ item }) => (
            <FriendItem item={item} onPress={navigateToFriendDetail} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatList}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <UserIcon size={20} color="white" />
          <Text style={styles.addButtonText}>Add Friends</Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={2}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add a friend</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <XMarkIcon size={24} color="#5E9020" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.usernameInput}
                placeholder="What's their username?"
                value={username}
                onChangeText={setUsername}
              />
              {message !== "" && (
                <Text
                  style={[
                    styles.message,
                    isSuccess ? styles.successMessage : styles.errorMessage,
                  ]}
                >
                  {message}
                </Text>
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.okButton]}
                  onPress={handleAddFriend}
                >
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 48,
    paddingHorizontal: padding,
  },
  row: {
    justifyContent: "space-between",
  },
  friendItemContainer: {
    width: cardSize,
    marginBottom: 16,
  },
  friendItem: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "black",
    marginBottom: 32,
  },
  gardenTitle: {
    color: "#5E9020",
    fontFamily: "MontserratBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    position: "relative", // Added this line
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    paddingRight: 40, // Added this line to make space for the icon
    fontFamily: "Montserrat",
    borderColor: "#EDEDED",
    borderWidth: 2,
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: "50%", // Added this line
    transform: [{ translateY: -10 }], // Added this line (half the icon size)
  },
  flowerImage: {
    width: cardSize * 0.6,
    height: cardSize * 0.6,
    resizeMode: "contain",
  },
  flowerType: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    color: "#333",
    marginBottom: 4,
    marginTop: 8,
    alignSelf: "flex-start", // Added this line
  },
  lastSeen: {
    fontSize: 12,
    fontFamily: "Montserrat",
    color: "#666",
    alignSelf: "flex-start", // Added this line
  },
  addButton: {
    backgroundColor: "#5E9020",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
    marginLeft: 8,
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
  usernameInput: {
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
  okButton: {
    backgroundColor: "#5E9020",
  },
  cancelButtonText: {
    color: "#5E9020",
    fontFamily: "Montserrat",
  },
  okButtonText: {
    color: "white",
    fontFamily: "MontserratBold",
  },
  message: {
    fontFamily: "Montserrat",
    textAlign: "center",
    marginBottom: 20,
  },
  successMessage: {
    color: "#4CAF50",
  },
  errorMessage: {
    color: "#F44336",
  },
  flatList: {
    paddingTop: 16,
  },
});
