import {StyleSheet, Dimensions} from 'react-native';
const BACKGROUND_COLOR = '#fff'; //'#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const TEXT_COLOR = '#191716';
const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
import Backdrop from './assets/custom-background.png'

const styles = StyleSheet.create({
    windowContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BACKGROUND_COLOR,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: height/10,
        height: height,
        width: width,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
        position: 'fixed',
        width: '100%',
        height: height/10,
        top: 0,
        left: 0,
        padding: 10,
    },
    body: {
        flexDirection: 'row',
        height: '100%'
    },
    leftSection: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
        width: width * 0.33,
        paddingLeft: 20,
        paddingRight: height/10 + 20,
    },
    circle: {
        position: 'absolute',
        height: height,
        width: width,
    },
    progressBox: {
        flex: 1,
        flexDireciton: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
        width: width * 0.33,
        padding: 20,
    },
    progressText: {
        fontSize: 40,
        color: TEXT_COLOR,
        marginTop: height/2,
        position: 'absolute',
        textAlign: 'center',
    },
    rightSection: {
        flex: 2,
        backgroundColor: BACKGROUND_COLOR,
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "fill",
        resizeMode: 'contain',
        backgroundRepeat: "no-repeat",
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.66,
        height: '100%',
    },
      logo: {
        width: undefined,
        height: '125%',
        aspectRatio: 2,
        resizeMode: 'contain',
        position: 'absolute'
      },
      titleText: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontWeight: 'bold',
      },
      textContainer: {
        position: 'absolute',
        top: height * 0.1,
        width: '100%',
        alignItems: 'center',
      },
      percentText: {
        fontSize: 80,
        color: TEXT_COLOR,
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
        color: TEXT_COLOR,
      }
    });
    
    export default styles;