import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  UserIcon,
  PlusIcon,
  ArrowUpIcon,
} from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");
const numRows = 2;
const itemSize = (height - 500) / numRows;

const flowerData = [
  { id: "1", image: require("../../assets/images/flowers/flower1.png") },
  { id: "2", image: require("../../assets/images/flowers/flower2.png") },
  { id: "3", image: require("../../assets/images/flowers/flower3.png") },
  { id: "4", image: require("../../assets/images/flowers/flower4.png") },
  { id: "5", image: require("../../assets/images/flowers/flower1.png") },
  { id: "6", image: require("../../assets/images/flowers/flower2.png") },
  { id: "7", image: require("../../assets/images/flowers/flower3.png") },
  { id: "8", image: require("../../assets/images/flowers/flower4.png") },
];

const memoryData = [
  {
    id: "1",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "2",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
  {
    id: "3",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "4",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
  {
    id: "5",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "6",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
  {
    id: "7",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "8",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
  {
    id: "9",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "10",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
  {
    id: "11",
    activity: "Got lunch at coffee shop",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower2.png"),
  },
  {
    id: "12",
    activity: "Went shopping together",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower1.png"),
    xp: "+12 xp",
  },
];

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Garden");
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measure((x, y, width, height) => {
        setHeaderHeight(height);
      });
    }
  }, []);

  const renderFlowerColumn = ({ item }) => (
    <View>
      {item.map((flower) => (
        <TouchableOpacity>
          <View key={flower.id} style={styles.flowerItem}>
            <Image source={flower.image} style={styles.flowerImage} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMemoryItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.memoryItem}>
        <View style={styles.memoryFlowerContainer}>
          <Image source={item.flower} style={styles.memoryFlower} />
        </View>
        <View style={styles.memoryContent}>
          <Text style={styles.memoryActivity}>{item.activity}</Text>
          <Text style={styles.memoryDate}>{item.date}</Text>
        </View>
        {item.xp ? (
          <Text style={styles.memoryXP}>{item.xp}</Text>
        ) : (
          <View style={styles.addXPButton}>
            <ArrowUpIcon size={10} color="#000" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const prepareFlowerData = () => {
    const columns = [];
    for (let i = 0; i < flowerData.length; i += numRows) {
      columns.push(flowerData.slice(i, i + numRows));
    }
    return columns;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View ref={headerRef} onLayout={() => {}}>
          <View style={styles.profileInfo}>
            <Image
              source={require("../../assets/images/creeper.png")}
              style={styles.profileImage}
            />
            <Text style={styles.username}>Auri</Text>
            <Text style={styles.joinDate}>Gardening since 10 August 2024</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Garden" && styles.activeTab]}
              onPress={() => setActiveTab("Garden")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Garden" && styles.activeTabText,
                ]}
              >
                Garden
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Memories" && styles.activeTab]}
              onPress={() => setActiveTab("Memories")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Memories" && styles.activeTabText,
                ]}
              >
                Memories
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "Garden" && (
          <FlatList
            data={prepareFlowerData()}
            renderItem={renderFlowerColumn}
            keyExtractor={(item, index) => `column-${index}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flowerGrid}
            style={styles.flowerList}
          />
        )}

        {activeTab === "Memories" && (
          <FlatList
            data={memoryData}
            renderItem={renderMemoryItem}
            keyExtractor={(item) => item.id}
            style={styles.memoriesList}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    marginTop: 20,
  },
  username: {
    alignSelf: "flex-start",
    fontSize: 26,
    fontFamily: "MontserratBold",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 50,
  },
  joinDate: {
    alignSelf: "flex-start",
    paddingHorizontal: 50,
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#999",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#5E9020",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#666",
  },
  activeTabText: {
    color: "#5E9020",
    fontFamily: "MontserratBold",
  },
  flowerList: {
    marginTop: 16,
  },
  flowerGrid: {
    paddingHorizontal: 7,
    paddingTop: 10,
  },
  flowerItem: {
    width: itemSize,
    height: itemSize,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  flowerImage: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  memoriesList: {
    marginTop: 16,
  },
  memoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  memoryFlowerContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginRight: 25,
    marginLeft: 10,
  },
  memoryFlower: { width: 30, height: 30, margin: "auto" },
  memoryContent: {
    flex: 1,
  },
  memoryActivity: {
    fontSize: 14,
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: "#444",
    paddingBottom: 4,
    padding: 5,
  },
  memoryDate: {
    fontSize: 11,
    fontFamily: "Montserrat",
    color: "#999",
    padding: 2,
  },
  memoryXP: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#000",
    marginRight: 10,
  },
  addXPButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default UserProfilePage;
