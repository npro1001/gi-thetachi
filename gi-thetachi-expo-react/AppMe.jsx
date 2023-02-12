// import logo from './logo.svg';
// import './App.css';
// import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { measureText } from 'retext';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window')
const CIRCLE_LENGTH = 1000 // 2pi/R
const R = CIRCLE_LENGTH / (2 * Math.PI)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)


function ProgressText({ progress }) {
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    measureText(progress, { fontSize: 80 }, setTextWidth);
  }, [progress]);

  return (
    <View style={styles.progressTextContainer}>
      <Text style={styles.progressText}>
        {progress}
      </Text>
    </View>
  );
};

export default function App() {

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {duration: 2000})
  }, [])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1-progress.value)
  }));

  return (
    <View style={styles.container}>
      <ProgressText progress={progress.value} />
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
          strokeDashoffset={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
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
    position: 'relative',
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center', 
    justifyContent: 'center',
    top: (height-80)/2,
    left: (width-80)/2,
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
  }
})





