import {View, Text, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import Animated, {
    FadeIn,
    FadeInRight,
    FadeOut,
    LinearTransition,
    useAnimatedStyle,
    withTiming
} from "react-native-reanimated";


type Props = {
    label: string;
    checked: boolean;
    onPress: () => void;
}

const CheckBox = ({label, checked, onPress}: Props) => {
    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming (
                checked ? "rgba(239, 142, 82, 0.1" : "transparent",
                {duration: 150}
            ),
            borderColor: withTiming (checked ? Colors.tint : Colors.black,
                {duration: 150,
            }),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16
        };
    }, [checked]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, {duration: 150}),
        }
    }, [checked]);

    return (
        <Animated.View style={[styles.container, rnAnimatedContainerStyle]} onTouchEnd={onPress}
        layout={LinearTransition.springify().mass(0.8)}>
            <Animated.Text style={styles.label}>{label}</Animated.Text>
            {checked && (
            <Animated.View style={styles.iconWrapper} entering={FadeIn.duration(350)} exiting={FadeOut}>
                <AntDesign name={'checkcircle'} size={14} color={Colors.tint}/>
            </Animated.View>
            )}
        </Animated.View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 32,
        paddingVertical: 8,
        // paddingHorizontal: 16,
    },
    label: {
        fontSize: 14,
        color: Colors.black,
    },
    iconWrapper: {
        marginLeft: 8,
        height: 14,
        width: 14,
    }
})
