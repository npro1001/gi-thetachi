import {StyleSheet, Dimensions} from 'react-native';
const BACKGROUND_COLOR = '#fff'; //'#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const TEXT_COLOR = '#191716';
const TEXT_COLOR2 = '#fff';
const TEXT_COLOR3 = '#09274B';

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
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
        position: 'absolute',
        width: width * 0.33,
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
    aboveProgressBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height/8,
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
        position: 'relative',
        textAlign: 'center',
    },
    progressBox: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
        aspectRatio: 1,
        padding: 10,
    },
    progressText: {
        flex: 1,
        fontSize: 40,
        color: TEXT_COLOR3,
        position: 'relative',
        textAlign: 'center',
    },
    rightSection: {
        zIndex: 1,
        flex: 2,
        backgroundColor: BACKGROUND_COLOR,
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "fill",
        flexDirection: 'column',
        resizeMode: 'contain',
        backgroundRepeat: "no-repeat",
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.66,
        height: '100%',
    },
      OXlogo: {
        zIndex: 1,
        width: undefined,
        height: undefined,
        aspectRatio: 2,
        resizeMode: 'contain',
      },
      USOlogo: {
        width: '20%',
        height: '30%',
        resizeMode: 'contain',
        aspectRatio: 1.2,
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
        color: TEXT_COLOR2,
        textAlign: 'center',
        padding: '2%'
      },
      goalText: {
        fontSize: 90,
        color: TEXT_COLOR3,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '5%',
        borderRadius: 25,
      },
      paragraphContainer: {
        position: 'absolute',
        // flexDirection: 'column',
        top: height * 0.1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        fontSize: 20,
      },
      paragraph: {
        fontSize: 23,
        color: TEXT_COLOR2,
        textAlign: 'center',
        padding: '2%'
      },
      miniText: {
        fontSize: 23,
        color: TEXT_COLOR3,
        textAlign: 'center',
        fontStyle: 'italic',
      }
    });
    
    export default styles;