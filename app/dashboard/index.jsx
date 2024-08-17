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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Dummy data for friends
const friendsData = [
  {
    id: "1",
    name: "Amy",
    flowerType: "Sunflower",
    flowerImage: require("../../assets/images/flowers/flower1.svg"),
    lastSeen: "with Amy",
  },
  {
    id: "2",
    name: "Auri",
    flowerType: "Rose",
    flowerImage: require("../../assets/images/flowers/flower2.svg"),
    lastSeen: "with Auri",
  },
  {
    id: "3",
    name: "Jack",
    flowerType: "Tulip",
    flowerImage: require("../../assets/images/flowers/flower3.svg"),
    lastSeen: "last seen",
  },
  {
    id: "4",
    name: "Thomas",
    flowerType: "Daisy",
    flowerImage: require("../../assets/images/flowers/flower4.svg"),
    lastSeen: "adventure",
  },
];

const FriendItem = ({ item }) => (
  <View style={styles.friendItem}>
    <Image source={item.flowerImage} style={styles.flowerImage} />
    <Text style={styles.flowerType}>{item.flowerType}</Text>
    <Text style={styles.lastSeen}>{item.lastSeen}</Text>
  </View>
);

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
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
      </View>
      <FlatList
        data={friendsData}
        renderItem={({ item }) => <FriendItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Friends</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontFamily: "NerkoOne",
    color: "#5E9020",
  },
  title: {
    fontSize: 32,
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  gardenTitle: {
    color: "#5E9020",
    fontFamily: "MontserratBold",
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Montserrat",
  },
  row: {
    justifyContent: "space-between",
  },
  friendItem: {
    width: (width - 48) / 2,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  flowerImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
    resizeMode: "stretch",
  },
  flowerType: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    color: "#333",
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    fontFamily: "Montserrat",
    color: "#666",
  },
  addButton: {
    backgroundColor: "#5E9020",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
});
