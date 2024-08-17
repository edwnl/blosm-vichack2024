import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { ArrowUpCircleIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const numRows = 2;
const itemSize = (height - 500) / numRows;

const flowerData = [
  { id: "1", image: require("../../assets/images/flowers/flower1.svg") },
  { id: "4", image: require("../../assets/images/flowers/flower2.svg") },
  { id: "2", image: require("../../assets/images/flowers/flower3.svg") },
  { id: "3", image: require("../../assets/images/flowers/flower4.svg") },
  { id: "5", image: require("../../assets/images/flowers/flower5.svg") },
  { id: "6", image: require("../../assets/images/flowers/flower6.svg") },
  { id: "7", image: require("../../assets/images/flowers/flower7.svg") },
  { id: "8", image: require("../../assets/images/flowers/flower8.svg") },
];

const memoryData = [
  {
    id: "1",
    activity: "Got lunch at coffee shop",
    date: "29 August 2024",
    flower: require("../../assets/images/flowers/flower1.svg"),
  },
  {
    id: "2",
    activity: "Went shopping together",
    date: "22 August 2024",
    flower: require("../../assets/images/flowers/flower2.svg"),
    xp: "+5 xp",
  },
  {
    id: "3",
    activity: "Went shopping together",
    date: "20 August 2024",
    flower: require("../../assets/images/flowers/flower3.svg"),
    xp: "+7 xp",
  },
  {
    id: "4",
    activity: "Went to the gym",
    date: "18 August 2024",
    flower: require("../../assets/images/flowers/flower4.svg"),
    xp: "+12 xp",
  },
  {
    id: "5",
    activity: "Got lunch at coffee shop",
    date: "14 August 2024",
    flower: require("../../assets/images/flowers/flower5.svg"),
  },
  {
    id: "6",
    activity: "Studied together",
    date: "12 August 2024",
    flower: require("../../assets/images/flowers/flower6.svg"),
    xp: "+7 xp",
  },
  {
    id: "7",
    activity: "Rock Climbing",
    date: "10 August 2024",
    flower: require("../../assets/images/flowers/flower7.svg"),
  },
  {
    id: "8",
    activity: "Went out for lunch",
    date: "5 August 2024",
    flower: require("../../assets/images/flowers/flower2.svg"),
    xp: "+4 xp",
  },
  {
    id: "9",
    activity: "Grabbed dinner together",
    date: "1 August 2024",
    flower: require("../../assets/images/flowers/flower4.svg"),
  },
  {
    id: "10",
    activity: "Went to the movies",
    date: "20 July 2024",
    flower: require("../../assets/images/flowers/flower8.svg"),
    xp: "+20 xp",
  },
  {
    id: "11",
    activity: "Got breakfast together",
    date: "12 July 2024",
    flower: require("../../assets/images/flowers/flower5.svg"),
    xp: "+15 xp",
  },
  {
    id: "12",
    activity: "Went to the gym together",
    date: "1 July 2024",
    flower: require("../../assets/images/flowers/flower6.svg"),
    xp: "+10 xp",
  },
];

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 50;

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Garden");
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderFlowerColumn = ({ item }) => (
    <View>
      {item.map((flower) => (
        <TouchableOpacity key={flower.id}>
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
            <ArrowUpCircleIcon size={22} fontWeight={600} color="#000" />
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
  const renderContent = () => {
    if (activeTab === "Garden") {
      return (
        <FlatList
          data={prepareFlowerData()}
          renderItem={renderFlowerColumn}
          keyExtractor={(item, index) => `column-${index}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flowerGrid}
          style={styles.flowerList}
        />
      );
    } else {
      return (
        <FlatList
          data={memoryData}
          renderItem={renderMemoryItem}
          keyExtractor={(item) => item.id}
          style={styles.memoriesList}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
      >
        {renderContent()}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            paddingTop: insets.top,
          },
        ]}
      >
        <Animated.View style={[styles.profileInfo, { opacity: headerOpacity }]}>
          <Image
            source={require("../../assets/images/creeper.png")}
            style={styles.profileImage}
          />
          <Text style={styles.username}>Auri</Text>
          <Text style={styles.joinDate}>Gardening since 1 July 2024</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.tabContainer,
          {
            top: Animated.add(headerHeight, insets.top),
            paddingTop: 0,
          },
        ]}
      >
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden",
    zIndex: 1,
  },
  profileInfo: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  username: {
    fontSize: 26,
    fontFamily: "MontserratBold",
    color: "#333",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginTop: 15,
    marginLeft: 50,
  },
  joinDate: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#999",
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "white",
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
    paddingTop: 52,
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
    marginTop: 50,
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
    fontWeight: "600",
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
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#999",
    marginRight: 10,
  },
  addXPButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default UserProfilePage;
