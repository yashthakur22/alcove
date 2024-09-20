import React, { useRef } from 'react';
import { View, Text, Image, Animated, PanResponder, Dimensions } from 'react-native';
import LoginScreen from './LoginScreen';
import styles from '../styles/globalStyles';

const { height } = Dimensions.get('window');

const MainPage = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const loginPageOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < 0) {
        pan.y.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50) {
        Animated.parallel([
          Animated.timing(pan.y, {
            toValue: -height,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(loginPageOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.mainContainer, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <Image
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}
        />
        <Text style={styles.swipeText}>Swipe up to login</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.loginContainer,
          {
            opacity: loginPageOpacity,
            transform: [
              {
                translateY: loginPageOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LoginScreen navigation={navigation} />
      </Animated.View>
    </View>
  );
};

export default MainPage;