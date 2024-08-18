import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Image,
  Animated,
} from "react-native";
import { ArrowUpCircleIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { BlurView } from "expo-blur";

// Import SVG components
import Flower1 from "../../assets/images/flowers/Flower1";
import Flower2 from "../../assets/images/flowers/Flower2";
import Flower3 from "../../assets/images/flowers/Flower3";
import Flower4 from "../../assets/images/flowers/Flower4";
import Flower5 from "../../assets/images/flowers/Flower5";
import Flower6 from "../../assets/images/flowers/Flower6";
import Flower7 from "../../assets/images/flowers/Flower7";
import Flower8 from "../../assets/images/flowers/Flower8";
import ProfilePicture from "../../assets/images/ProfilePicture";

import hangoutImage from "../../assets/images/hangout.png";

const { width, height } = Dimensions.get("window");
const numRows = 2;
const itemSize = (height - 550) / numRows;

const flowerComponents = {
  Flower1,
  Flower2,
  Flower3,
  Flower4,
  Flower5,
  Flower6,
  Flower7,
  Flower8,
};

const flowerData = [
  { id: "1", FlowerComponent: Flower1 },
  { id: "4", FlowerComponent: Flower2 },
  { id: "2", FlowerComponent: Flower3 },
  { id: "3", FlowerComponent: Flower4 },
  { id: "5", FlowerComponent: Flower5 },
  { id: "6", FlowerComponent: Flower6 },
  { id: "7", FlowerComponent: Flower7 },
  { id: "8", FlowerComponent: Flower8 },
];

const memoryData = [
  {
    id: "1",
    activity: "Got lunch at coffee shop",
    date: "29 August 2024",
    FlowerComponent: Flower1,
  },
  {
    id: "2",
    activity: "Went shopping together",
    date: "22 August 2024",
    FlowerComponent: Flower2,
    xp: "+5 xp",
  },
  {
    id: "3",
    activity: "Went shopping together",
    date: "20 August 2024",
    FlowerComponent: Flower3,
    xp: "+7 xp",
  },
  {
    id: "4",
    activity: "Went to the gym",
    date: "18 August 2024",
    FlowerComponent: Flower4,
    xp: "+12 xp",
  },
  {
    id: "5",
    activity: "Got lunch at coffee shop",
    date: "14 August 2024",
    FlowerComponent: Flower5,
  },
  {
    id: "6",
    activity: "Studied together",
    date: "12 August 2024",
    FlowerComponent: Flower6,
    xp: "+7 xp",
  },
  {
    id: "7",
    activity: "Rock Climbing",
    date: "10 August 2024",
    FlowerComponent: Flower7,
  },
  {
    id: "8",
    activity: "Went out for lunch",
    date: "5 August 2024",
    FlowerComponent: Flower2,
    xp: "+4 xp",
  },
  {
    id: "9",
    activity: "Grabbed dinner together",
    date: "1 August 2024",
    FlowerComponent: Flower4,
  },
  {
    id: "10",
    activity: "Went to the movies",
    date: "20 July 2024",
    FlowerComponent: Flower8,
    xp: "+20 xp",
  },
  {
    id: "11",
    activity: "Got breakfast together",
    date: "12 July 2024",
    FlowerComponent: Flower5,
    xp: "+15 xp",
  },
  {
    id: "12",
    activity: "Went to the gym together",
    date: "1 July 2024",
    FlowerComponent: Flower6,
    xp: "+10 xp",
  },
];

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 50;

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Garden");
  const [modalVisible, setModalVisible] = useState(false);
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
            <flower.FlowerComponent
              style={styles.flowerImage}
              width={80}
              height={80}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMemoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.memoryItem}>
        <View style={styles.memoryFlowerContainer}>
          <item.FlowerComponent width={40} height={40} />
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
    <>
      <Navbar />
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
            },
          ]}
        >
          <Animated.View
            style={[styles.profileInfo, { opacity: headerOpacity }]}
          >
            <ProfilePicture width={100} height={100} />
            <Text style={styles.username}>Auri</Text>
            <Text style={styles.joinDate}>Gardening since 1 July 2024</Text>
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[
            styles.tabContainer,
            {
              top: headerHeight,
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={10} style={styles.blurContainer}>
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.imageContainer}>
              <Image source={hangoutImage} style={styles.hangoutImage} />
            </View>
          </TouchableOpacity>
        </BlurView>
      </Modal>
    </>
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
    alignSelf: "center",
    marginTop: 15,
  },
  joinDate: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#999",
    alignSelf: "center",
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
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#666",
  },
  activeTabText: {
    color: "#5E9020",
    fontFamily: "MontserratBold",
  },
  flowerList: {
    marginTop: 0,
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
  memoryFlowerContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginRight: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  memoriesList: {
    marginTop: 60,
  },
  memoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
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
  },
  addXPButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
  },
  hangoutImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default UserProfilePage;
