import React from 'react';
import {View, Text} from "react-native";

interface Category {
    title: string;
    focused: boolean;
}

const CategoryBadge = ({title, focused}: Category) => {
    return (
        <View style={[styles.textContainer, focused && {backgroundColor: "#efe", borderColor: "#00ff11"}]}>
            <Text style={[styles.textLabel, focused && {fontFamily: "Geist Medium"}]}>
                {title}
            </Text>
        </View>
    );
};

export default CategoryBadge;

const styles = {
    textContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textLabel: {
        fontSize: 13,
        fontFamily: "Geist",
    }
}