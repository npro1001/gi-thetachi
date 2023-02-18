import {StyleSheet, Dimensions} from 'react-native';
const BACKGROUND_COLOR = '#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

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
    percentText: {
      fontSize: 80,
      color: 'rgba(256,256,256,0.7)',
      width: 200,
      textAlign: 'center',
    },
    progressText: {
      position: 'absolute',
      fontSize: 40,
      color: 'rgba(256,256,256,0.7)',
      top: 3*(height/4),
      width: width/2,
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

export default styles