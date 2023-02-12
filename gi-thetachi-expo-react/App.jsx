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
  useDerivedValue,
  setValue,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  // Right now the progress finishes up to the apiValue, but the number doesnt change
  // the number should be the amount of money raised
  // The progrees shoud be that number/total goal number
  const [apiValue, setApiValue] = useState(0);
  const progress = useSharedValue(apiValue);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));
  const progressText = useDerivedValue(() => {
    // return `${progress.value < 1 ? Math.floor(progress.value * 100) : 100}`;
    return `${apiValue}`
  }, [apiValue]);

  useEffect(() => {
    progress.value = withTiming(apiValue, { duration: 2000 });
  }, [apiValue, progress]);
  
  const onPress = useCallback(() => {
    // fetch('https://your-api-endpoint.com/api/progress')
    //   .then(response => response.json())
    //   .then(data => {
    //     progress.value = withTiming(data.progress, { duration: 2000 });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
    progress.value = withTiming(0.7, { duration: 2000 });
    console.log(progress.value)
    setApiValue(0.7)
  }, []);

  return (
    <View style={styles.container}>
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
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
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
});