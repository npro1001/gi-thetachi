import * as React from "react";
import {Text, TextInput} from "react-native";
import Animated, { useAnimatedProps, useDerivedValue, useAnimatedReaction, interpolate } from 'react-native-reanimated'
import styles from './styles'
import { ReText } from 'react-native-redash';


// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
Animated.addWhitelistedNativeProps({});


const AnimatedText = ({ progressPercent }) => {

    const progressPercentAnimated = useDerivedValue(() => {
        console.log(progressPercent.value)
        const percent = Math.floor(progressPercent.value * 100);
        return percent;
    });

    const animatedProps = useAnimatedProps(() => {
        console.log(progressPercentAnimated.value)
        return {
            text: `${progressPercentAnimated.value}%`
            // text:`${interpolate(progressPercentAnimated.value, [0, 100], [0, 100], Animated.Extrapolate.CLAMP)}%`,
        }
    })

    return (
        // <Animated.Text
        //     style={styles.percentText}
        //     animatedProps={animatedProps}
        // />
        <Animated.Text style={styles.percentText} animatedProps={animatedProps} />
    )
}

export default AnimatedText;
