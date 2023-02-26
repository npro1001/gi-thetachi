import React, { useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles.jsx'
import Animated, { useSharedValue, withTiming, useAnimatedProps, useDerivedValue} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import OXLogo from './assets/theta-chi-logo.png';
import USOLogo from './assets/uso_logo.png';
import Backdrop from './assets/custom-background.png'
// import Constants from 'expo-constants';

const apiUrl = process.env.REACT_APP_SERVER;

Animated.addWhitelistedNativeProps({ text: true });

const BACKGROUND_COLOR = '#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const goalS = '1,500' //30000
const goal = 1500 //30000

export default function App() {

  const [progressValue, setProgressValue] = useState(0.0);
  const [progressPercentText, setProgressPercentText] = useState('0%');
  const progressPercent = useSharedValue(0);
  
  useEffect(() => {
    const source = new EventSource(apiUrl + '/stream-data');

    // Retrieve Server Sent Event
    source.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      const amount = data['total_amount'];
      setProgressValue(amount);
      progressPercent.value = withTiming(amount ? amount / goal : 0, { duration: 2000 })
    });
    source.addEventListener('error', function(event) {
      const errorTimeout = setTimeout(() => {
        alert("Failed to connect to event stream. Error: " + event);
      }, 2000);
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
      {/* *** HEADER *** */}
      <View style={styles.header}>
        <Image source={OXLogo} style={styles.OXlogo}/>
      </View>
      <View style={styles.body}>
        {/* *** LEFT SECTION *** */}
        <View style={styles.leftSection}>

          {/* Goal Text */}
          <View style={styles.aboveProgressBox}>
            <Text style={styles.miniText}>Our 2023 Goal</Text>
            <GoalText goal={goalS}/>
          </View>

          {/* Progress Circle */}
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

          {/* Current Progress */}
          <ProgressText style={styles.progressText} value={progressValue}/>       
        </View>

        {/* *** RIGHT SECTION *** */}
        <View style={styles.rightSection}>
          <Image source={Backdrop} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <View style={styles.paragraphContainer}>
            <Text style={styles.titleText}>G.I. Theta Chi 2023</Text>
            <Image source={USOLogo} style={styles.USOlogo}/>
            <Text style={styles.paragraph}>In 2013 the first ever G.I. Theta Chi event was held by the UCF chapter of Theta Chi.  Since then, it has grown into one of the largest philanthropic events hosted by various chapters  across the nation. Since it’s conception, we have raised over $100,000 for the U.S.O. and  raised over $45,000 last year alone.  </Text>
            <Text style={styles.paragraph}>The U.S.O. strengthens America’s military service members by keeping them connected to family, home and country throughout their service to the nation.</Text>
            <Text style={styles.paragraph}>Help us hit our 2023 goal!    <span style={{fontWeight:'bold', textDecoration:'underline'}}>Venmo: @githetachi23</span></Text>
          </View>
        </View>
      </View>
    </View>
    
  );
}


const ProgressText = ({ value }) => {
  return <Text style={styles.progressText}>Raised ${value}</Text>
}

const GoalText = ({ goal }) => {
  return <Text style={styles.goalText}>${goal}</Text>
}

