import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon } from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

// Dummy data for the user's garden
const gardenData = [
  { id: '1', image: require('../../assets/images/flowers/flower1.png') },
  { id: '2', image: require('../../assets/images/flowers/flower2.png') },
  { id: '3', image: require('../../assets/images/flowers/flower3.png') },
  { id: '4', image: require('../../assets/images/flowers/flower4.png') },
];

const ProfilePage = () => {
  const { username } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.profileInfo}>
          <Image
            source={require('../../assets/images/default-avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>{username}'s Garden</Text>
          <Text style={styles.gardeningSince}>Gardening since 10 August 2024</Text>
        </View>

        <View style={styles.gardenGrid}>
          {gardenData.map((item) => (
            <View key={item.id} style={styles.flowerContainer}>
              <Image source={item.image} style={styles.flowerImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'NerkoOne',
    color: '#5E9020',
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    color: '#333',
    marginBottom: 8,
  },
  gardeningSince: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#666',
  },
  gardenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  flowerContainer: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  flowerImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export default ProfilePage;