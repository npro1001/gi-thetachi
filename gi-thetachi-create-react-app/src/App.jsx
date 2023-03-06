import React, { useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import styles from './styles.jsx'
import styles2 from './styles2.jsx'
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
// const { width, height } = Dimensions.get('window');
// const isSmallScreen = (() => { if(width < 500) return True});
// const isLargeScreen = (() => { if(width >= 800) return True});
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const goalS = '30,000' //30000
const goal = 30000 //30000

export default function App() {

  const [progressValue, setProgressValue] = useState(0.0);
  const [progressPercentText, setProgressPercentText] = useState('0%');
  const progressPercent = useSharedValue(0);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  
  useEffect(() => {
    // const source = new EventSource(apiUrl + '/stream-data');

    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    const fetchData = async () => {
      const response = await fetch(apiUrl + '/stream-data');
      const data = await response.json();
      const amount = data.total_amount;
      setProgressValue(amount);
      progressPercent.value = withTiming(amount ? amount / goal : 0, { duration: 2000 })
    };

    fetchData();
    
    return () => {
      // source.close();
      Dimensions.removeEventListener('change', updateLayout);
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

  {
    if(screenWidth >= 800) { return (
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
              <Text style={styles.goalText}>${goalS}</Text>
            </View>

            {/* Progress Circle */}
            <View style={styles.progressBox}>
              <Animated.Text style={styles.percentText}>{progressPercentText}</Animated.Text>
              <Svg style={styles.circle}>
                <Circle
                  cx={screenWidth / 2}
                  cy={screenHeight / 2}
                  r={R}
                  fill='none'
                  stroke={BACKGROUND_STROKE_COLOR}
                  strokeWidth={30}
                />
                <AnimatedCircle
                  cx={screenWidth / 2}
                  cy={screenHeight / 2}
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
            <Text style={styles.progressText}>Raised ${progressValue}</Text>       
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
  } else { return (
    <View style={styles2.mobileContainer}>
      {/* <ScrollView style={styles2.scrollView} contentContainerStyle={styles2.contentContainer}> */}
        <View style={styles2.container1}>
          {/* OX Logo */}
          <View style={styles2.header}>
            <Image source={OXLogo} style={styles2.OXlogo}/>
          </View>
          {/* Goal Text */}
          <View style={styles2.aboveProgressBox}>
            <Text style={styles2.miniText}>Our 2023 Goal</Text>
            <Text style={styles2.goalText}>${goalS}</Text>
                        {/* Current Progress */}
                        <ProgressText style={styles2.progressText} value={progressValue}/>
          </View>
          {/* Progress Circle */}
          <View style={styles2.progressBox}>
            <Animated.Text style={styles2.percentText}>{progressPercentText}</Animated.Text>
            <Svg style={styles2.circle}>
              <Text>HI</Text>
              <Circle
                cx={screenWidth / 2}
                cy={screenHeight / 2}
                r={screenWidth / (2 * Math.PI)}
                fill='none'
                stroke={BACKGROUND_STROKE_COLOR}
                strokeWidth={15}
              />
              <AnimatedCircle
                cx={screenWidth / 2}
                cy={screenHeight / 2}
                r={screenWidth / (2 * Math.PI)}
                fill='none'
                stroke={STROKE_COLOR}
                strokeWidth={7}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={animatedProps}
                strokeLinecap={'round'}
              />
            </Svg>
          </View>
        </View>
        <View style={styles2.container2}>   
          <Image source={Backdrop} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
          <View style={styles2.paragraphContainer}>
            <Text style={styles2.titleText}>G.I. Theta Chi 2023</Text>
            <Image source={USOLogo} style={styles2.USOlogo}/>
            <Text style={styles2.paragraph}>In 2013 the first ever G.I. Theta Chi event was held by the UCF chapter of Theta Chi.  Since then, it has grown into one of the largest philanthropic events hosted by various chapters  across the nation. Since it’s conception, we have raised over $100,000 for the U.S.O. and  raised over $45,000 last year alone.  </Text>
            <Text style={styles2.paragraph}>The U.S.O. strengthens America’s military service members by keeping them connected to family, home and country throughout their service to the nation.</Text>
            <Text style={styles2.paragraph}>Help us hit our 2023 goal!</Text>
            <Text style={styles2.paragraph}><span style={{fontWeight:'bold', textDecoration:'underline'}}>Venmo: @githetachi23</span></Text>
          </View>
        </View>
    {/* </ScrollView> */}
    </View>
  );}}

}


const ProgressText = ({ value }) => {
  return <Text>Raised ${value}</Text>
}

const GoalText = ({ goal }) => {
  return <Text>${goal}</Text>
}

