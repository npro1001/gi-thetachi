import {StyleSheet, Dimensions} from 'react-native';
const BACKGROUND_COLOR = '#fff'; //'#191716';
const BACKGROUND_STROKE_COLOR = '#78171A';
const TEXT_COLOR = '#191716';
const TEXT_COLOR2 = '#fff';
const TEXT_COLOR3 = '#09274B';

const STROKE_COLOR = '#DB4348';
const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 300; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
import Backdrop from './assets/custom-background.png'

const styles2 = StyleSheet.create({
    scrollView: {
        flex: 1,
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#fff',
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    mobileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BACKGROUND_COLOR,
        // alignItems: 'center',
        justifyContent: 'center',
        height: height + 500,
        width: width,
        // overflowX: "hidden",
        overflowY: "scroll",
        overflow: 'hidden',
        // overflow: "scroll",
        flexGrow: 1,
    },
    container2: {
        flex: 1,
        zIndex: 2,
        // flexGrow: 2,
        // overflowY: "scroll",
        position: 'relative',
        // height: height,
        height: height + 500,
    },
    container1: {
        flex: 0.5,
        // flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        zIndex: 1,
        backgroundColor: BACKGROUND_COLOR,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: width,
        height: height/10,
        top: 10,
        left: 0,
        marginBottom: 10,
        flex: 1
    },
    OXlogo: {
        zIndex: 2,
        width: "100px",
        height: "100px",
        aspectRatio: 1,
        resizeMode: 'contain',
      },
    circle: {
        zIndex: 1,
        flex: 1,
        position: 'absolute',
        height: height,
        width: width,
    },
    aboveProgressBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
        position: 'relative',
        textAlign: 'center',
        marginTop: height/10
    },
    progressBox: {
        zIndex: 2,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: BACKGROUND_COLOR,
        aspectRatio: 1,
        paddingBottom: 30,
    },
    progressText: {
        flex: 1,
        fontSize: 40,
        color: TEXT_COLOR3,
        marginTop: 20,
        position: 'absolute',
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
      USOlogo: {
        width: '20%',
        height: '30%',
        resizeMode: 'contain',
        aspectRatio: 1.5,
      },
      textContainer: {
        position: 'absolute',
        top: height * 0.1,
        width: '100%',
        alignItems: 'center',
      },
      percentText: {
        fontSize: 40,
        color: TEXT_COLOR,
        textAlign: 'center',
      },
      titleText: {
        fontSize: 40,
        color: TEXT_COLOR2,
        textAlign: 'center',
        padding: '2%'
      },
      goalText: {
        fontSize: 40,
        color: TEXT_COLOR3,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '5%',
        // borderRadius: 25,
      },
      paragraphContainer: {
        position: 'absolute',
        // flexDirection: 'column',
        top: height * 0.1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        fontSize: 10,
      },
      paragraph: {
        fontSize: 20,
        color: TEXT_COLOR2,
        textAlign: 'center',
        padding: '2%'
      },
      venmoText: {
        fontSize: 18,
        color: TEXT_COLOR2,
        textAlign: 'center',
        padding: '2%'
      },
      miniText: {
        fontSize: 20,
        color: TEXT_COLOR3,
        textAlign: 'center',
        fontStyle: 'italic',
      },
      venmoButton: {
      // backgroundColor: TEXT_COLOR3,
      // borderWidth: 2,
      // borderColor: TEXT_COLOR2,
      marginTop: 15,
      padding: 10,
      borderRadius: 25,
      alignSelf: 'flex-start',
    },
    venmoButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'uppercase',
    }
    });
    
    export default styles2;