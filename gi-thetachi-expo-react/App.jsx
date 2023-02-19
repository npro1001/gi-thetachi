import React, { useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withTiming, useAnimatedProps, useDerivedValue} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';
import Logo from './assets/theta-chi-logo.png';
import Backdrop from './assets/custom-background.png'

// import Logo from './assets/adaptive-icon.png';


Animated.addWhitelistedNativeProps({ text: true });

const BACKGROUND_COLOR = '#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const goal = 1500 //30000


export default function App() {

  const [progressValue, setProgressValue] = useState(0.0);
  const [progressPercentText, setProgressPercentText] = useState('0%');
  const progressPercent = useSharedValue(0);

  useEffect(() => {
    const source = new EventSource('http://127.0.0.1:5000/stream-data');

    // Retrieve Server Sent Event
    source.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      const amount = data['total_amount'];
      setProgressValue(amount);
      progressPercent.value = withTiming(amount ? amount / goal : 0, { duration: 2000 })
    });
    source.addEventListener('error', function(event) {
      data = JSON.parse(event.data);
      alert("Failed to connect to event stream. Error: " + data);
    }, false);
    
    return () => {
      source.close();
    };
  })

  // Moving inner circle
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progressPercent.value),
  }));

  // 0% -> x% Text value inside circle
  // Derived value uses Shaed value
  useDerivedValue(() => {
    const percent = Math.floor(progressPercent.value * 100);
    setProgressPercentText(`${percent}%`);
  });

  return (
    <View style={styles.windowContainer}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo}/>
      </View>
      <View style={styles.body}>
        <View style={styles.leftSection}>
          <View style={styles.progressBox}>
            <Animated.Text style={styles.percentText}>{progressPercentText}</Animated.Text>
            <Svg style={styles.circle}>
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
          </View>
          <ProgressText style={styles.progressText} value={progressValue}/> 
        </View>
        <View style={styles.rightSection}>
          <Text>SOMESHIT</Text>
          <Image
            source={Backdrop}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
      </View>

      {/* <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity> */}
    </View>
    
  );
}


const ProgressText = ({ value }) => {
  return <Text style={styles.progressText}>${value} total raised</Text>
}

