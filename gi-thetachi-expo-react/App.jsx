import React, { useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const goal = 30000
const total = 10000

export default function App() {
  // Right now the progress finishes up to the currentTotal, but the number doesnt change
  // the number should be the amount of money raised
  // The progrees shoud be that number/total goal number
  // const [currentTotal, setCurrentTotal] = useState(0.0);
  const progress = useSharedValue(0);
  
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  // useEffect(() => {
  //   // console.log("Current total " + currentTotal)
  //   console.log("Progress.value " + progress.value)
  //   console.log("ProgressText.value" + progressText.value)
  //   // current total should get from API initially

  //   progress.value = withTiming((total/goal), { duration: 2000 })
  //   progressText.value = Math.floor(progress.value * 100);

  //   console.log("Progress.value " + progress.value)
  //   console.log("ProgressText.value" + progressText.value)

  //   progressText.value = Math.floor(progress.value * 100);
  // }, [progress.value]);
  
  const onPress = useCallback(() => {
    // fetch('https://your-api-endpoint.com/api/progress')
    //   .then(response => response.json())
    //   .then(data => {
    //     progress.value = withTiming(data.progress, { duration: 2000 });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   }) 

    progress.value = withTiming(1, { duration: 2000 })
    // progress.value = withTiming((total/goal), { duration: 2000 })
    // progressText.value = Math.floor(progress.value * 100);
    console.log("Progress.value " + progress.value)
    console.log("ProgressText.value" + progressText.value)

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>GI Theta Chi</Text>
      </View>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: 'absolute' }} height={height} width={width}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill='none'
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill='none'
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
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
  textContainer: {
    position: 'absolute',
    top: height * 0.1,
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.5,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
  titleText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
  }
});