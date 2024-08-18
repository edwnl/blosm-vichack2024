import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Path } from 'react-native-svg';

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
  <Svg width="64" height="64" viewBox="0 0 16 16">
    {/* Stem */}
    <Rect x="7" y="12" width="2" height="4" fill="#4CAF50" />
    <Rect x="6" y="14" width="1" height="2" fill="#4CAF50" />
    <Rect x="9" y="14" width="1" height="2" fill="#4CAF50" />
    
    {/* Leaves */}
    <Rect x="5" y="11" width="2" height="2" fill="#66BB6A" />
    <Rect x="9" y="10" width="2" height="2" fill="#66BB6A" />
    
    {/* Flower petals */}
    <Rect x="7" y="2" width="2" height="2" fill="#FFC107" />
    <Rect x="5" y="4" width="2" height="2" fill="#FFC107" />
    <Rect x="9" y="4" width="2" height="2" fill="#FFC107" />
    <Rect x="3" y="6" width="2" height="2" fill="#FFC107" />
    <Rect x="11" y="6" width="2" height="2" fill="#FFC107" />
    <Rect x="5" y="8" width="2" height="2" fill="#FFC107" />
    <Rect x="9" y="8" width="2" height="2" fill="#FFC107" />
    <Rect x="7" y="10" width="2" height="2" fill="#FFC107" />
    
    {/* Flower center */}
    <Rect x="7" y="6" width="2" height="2" fill="#FF5722" />
    <Rect x="6" y="5" width="1" height="1" fill="#FF5722" />
    <Rect x="9" y="5" width="1" height="1" fill="#FF5722" />
    <Rect x="5" y="6" width="1" height="2" fill="#FF5722" />
    <Rect x="10" y="6" width="1" height="2" fill="#FF5722" />
    <Rect x="6" y="8" width="1" height="1" fill="#FF5722" />
    <Rect x="9" y="8" width="1" height="1" fill="#FF5722" />
    
    {/* Highlights */}
    <Rect x="7" y="3" width="1" height="1" fill="#FFE082" />
    <Rect x="6" y="4" width="1" height="1" fill="#FFE082" />
    <Rect x="4" y="6" width="1" height="1" fill="#FFE082" />
    <Rect x="6" y="9" width="1" height="1" fill="#FFE082" />
  </Svg>
);


const WaterFlowerAnimation = () => {
  const [animationProgress] = useState(new Animated.Value(0));
  const [drops, setDrops] = useState([]);
  const animationsRef = useRef([]);

  useEffect(() => {
    // Create water drops with staggered animation
    const newDrops = Array(15).fill().map((_, i) => {
      const anim = new Animated.Value(-height);
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

    Animated.parallel([
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      ...newDrops.map((drop, index) =>
        Animated.loop(
          Animated.timing(drop.animation, {
            toValue: height,
            duration: 3000 + Math.random() * 1000,
            delay: index * 200, // Stagger the drops
            useNativeDriver: true,
            easing: Easing.linear,
          })
        )
      ),
    ]).start();
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
    <View style={styles.container}>
      <LinearGradient
        colors={['white', '#E8F5E9']}
        style={StyleSheet.absoluteFillObject}
      />
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
      </Animated.View>

      {/* Animate the flower along with the content */}
      <Animated.View style={[styles.pixelFlower, { transform: [{ translateY: contentTranslate }] }]}>
        <PixelFlower />
      </Animated.View>
    </View>
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
    top: 0,
  },
  pixelFlower: {
    position: 'absolute',
    bottom: '15%', // Adjust this value as needed
    left: '50%',
    marginLeft: -32, // Half of the SVG width to center it
  },
});

export default WaterFlowerAnimation;
