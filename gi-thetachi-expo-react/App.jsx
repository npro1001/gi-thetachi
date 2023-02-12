// import logo from './logo.svg';
// import './App.css';
// import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window')
const CIRCLE_LENGTH = 1000 // 2pi/R
const R = CIRCLE_LENGTH / (2 * Math.PI)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)


export default function App() {

  const progress = useSharedValue(0);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Circle 
          cx={width/2} 
          cy={height/2} 
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          fill="none"
        />
        <AnimatedCircle 
          cx={width/2} 
          cy={height/2} 
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          fill="none"
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.7}
        />
      </Svg>
      {/* <StatusBar style="auto"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

