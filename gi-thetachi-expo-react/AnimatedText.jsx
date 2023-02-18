import * as React from "react";
import {TextInput} from "react-native";
import Animated, { useAnimatedProps } from 'react-native-reanimated'
import styles from './styles'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const AnimatedText = ({ text }) => {

    const animatedProps = useAnimatedProps(() => {
        return {
            text: String(text.value),
        }
    })

    return (
        <AnimatedTextInput
            value={text.value}
            style={styles.percentText}
            animatedProps={animatedProps}
        />
    )
}

export default AnimatedText;
