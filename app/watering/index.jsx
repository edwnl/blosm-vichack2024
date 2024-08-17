import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Cloud = ({ style }) => (
  <Svg height="40" width="80" viewBox="0 0 80 40" style={style}>
    <Path
      d="M10 30 Q20 20 30 30 T50 30 Q60 30 70 25 T50 20 Q40 10 30 20 Q20 10 10 20 Q0 25 10 30"
      fill="#F0F0F0"
    />
  </Svg>
);

const WaterDroplet = ({ style }) => (
  <Svg height="20" width="15" viewBox="0 0 15 20" style={style}>
    <Path
      d="M7.5 0 C3.75 5 0 10 0 15 C0 17.75 3.25 20 7.5 20 C11.75 20 15 17.75 15 15 C15 10 11.25 5 7.5 0"
      fill="rgba(173, 216, 230, 0.7)"
    />
  </Svg>
);

const PixelFlower = () => (
  <View style={styles.pixelFlower}>
    <View style={styles.flowerStem} />
    <View style={styles.flowerHead} />
    <View style={styles.flowerLeaf} />
  </View>
);

const WaterFlowerAnimation = () => {
  const [animationProgress] = useState(new Animated.Value(0));
  const [drops, setDrops] = useState([]);
  const animationsRef = useRef([]);

  useEffect(() => {
    // Create water drops with staggered animation
    const newDrops = Array(15).fill().map((_, i) => {
      const anim = new Animated.Value(-20);
      animationsRef.current.push(anim);
      return {
        id: i,
        left: Math.random() * width,
        animation: anim,
      };
    });
    setDrops(newDrops);

    // Start the main animation
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();

    // Start individual drop animations
    newDrops.forEach((drop, index) => {
      Animated.loop(
        Animated.timing(drop.animation, {
          toValue: height + 20, // Ensure the drops fall off the screen
          duration: 2000 + Math.random() * 1000,
          delay: index * 200,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    });

    // Cleanup function
    return () => {
      animationsRef.current.forEach(anim => anim.stopAnimation());
    };
  }, []);

  const renderWaterDrops = () => {
    return drops.map((drop) => (
      <Animated.View
        key={drop.id}
        style={[
          styles.waterDrop,
          {
            left: drop.left,
            transform: [{ translateY: drop.animation }],
          },
        ]}
      >
        <WaterDroplet />
      </Animated.View>
    ));
  };

  // Start the content lower down on the page
  const contentTranslate = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.3, 0], 
  });

  return (
    <LinearGradient
      colors={['white', '#E8F5E9']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { transform: [{ translateY: contentTranslate }] }]}>
        <View style={styles.cloudContainer}>
          <Cloud style={styles.cloud1} />
          <Cloud style={styles.cloud2} />
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message}>keep phones</Text>
          <Text style={[styles.message, styles.boldMessage]}>together</Text>
        </View>

        {renderWaterDrops()}

        <PixelFlower />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    height: height * 1.2,
  },
  cloudContainer: {
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
  },
  cloud1: {
    position: 'absolute',
    left: '10%',
  },
  cloud2: {
    position: 'absolute',
    right: '15%',
    top: 20,
  },
  messageContainer: {
    position: 'absolute',
    top: '30%',
    width: '100%',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontFamily: 'Montserrat',
    color: '#333',
    textAlign: 'center',
  },
  boldMessage: {
    fontFamily: 'MontserratBold',
  },
  waterDrop: {
    position: 'absolute',
    top: -20,
  },
  pixelFlower: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    marginLeft: -15,
  },
  flowerStem: {
    width: 6,
    height: 30,
    backgroundColor: '#4CAF50',
    marginLeft: 9,
  },
  flowerHead: {
    width: 24,
    height: 24,
    backgroundColor: '#E91E63',
    borderRadius: 4,
  },
  flowerLeaf: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    transform: [{ rotate: '45deg' }],
    top: 15,
    left: -3,
  },
});

export default WaterFlowerAnimation;
