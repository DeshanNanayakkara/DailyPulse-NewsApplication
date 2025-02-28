import {NewsDataType} from "@/types";
import Animated, {SharedValue} from "react-native-reanimated";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
};

const Pagination = ({items, paginationIndex, scrollX} : Props) => {
    return (
        <View style={styles.container}>
            {
                items.map((_, index) => {
                    return(
                        <Animated.Text
                            style = {[
                                styles.dot,
                                {
                                    backgroundColor:
                                    paginationIndex === index ? Colors.tint : Colors.darkGrey
                                },
                            ]}
                            key={index}
                        />
                    )
                })
            }
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    }
});
