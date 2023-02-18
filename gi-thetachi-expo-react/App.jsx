import React, { useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'
import AnimatedText from './AnimatedText'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';
import AnimateableText from 'react-native-animateable-text';

Animated.addWhitelistedNativeProps({ text: true });


const BACKGROUND_COLOR = '#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const goal = 1500 //30000
// Animated.addWhitelistedNativeProps({ text: true });


export default function App() {

  const [progressValue, setProgressValue] = useState(0.0);
  const progressPercent = useSharedValue(0);

  // const textAnimatedProps = useAnimatedProps(() => {
	// 	return { text: progressPercent.value };
	// });

  useEffect(() => {
    const source = new EventSource('http://127.0.0.1:5000/stream-data');

    source.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      const amount = data['total_amount'];
      setProgressValue(amount);
      progressPercent.value = withTiming(amount ? amount/goal : 0, { duration: 2000 })
    });

    source.addEventListener('error', function(event) {
      data = JSON.parse(event.data);
      alert("Failed to connect to event stream. Error: " + data);
    }, false);

    return () => {
      source.close();
    };
  }, [])


  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progressPercent.value),
  }));

  const progressPercentText = useDerivedValue(() => {
    const percent = Math.floor(progressPercent.value * 100);
    console.log(percent)
    return `${percent}%`;
  });

  const animatedProps2 = useAnimatedProps(() => {
      return {
        text: progressPercentText.value,
      };
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>GI Theta Chi</Text>
      </View>
      {/* <AnimatedText editable={false} value={progressPercentText.value} animatedProps={textAnimatedProps} /> */}
      {/* <PercentText value={progressPercentText.value}/> */}
      {/* <ReText style={styles.percentText} text={progressPercentText} />  */}
      {/* <Text style={styles.percentText}>{progressPercentText.value}</Text> */}
      {/* <AnimatedText text={progressPercentText} /> */}
      <AnimateableText animatedProps={animatedProps2} />
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
      <ProgressText value={progressValue}/> 
      {/* <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity> */}
    </View>
  );
}

// const animatedTextStyle = useAnimatedStyle(() => {
//   return {
//     fontSize: 80,
//     color: 'rgba(256,256,256,0.7)',
//     width: 200,
//     textAlign: 'center',
//   };
// });

const ProgressText = ({ value }) => {
  return <Text style={styles.progressText}>{value}</Text>
}

