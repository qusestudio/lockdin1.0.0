import React from 'react';
import {Text, TouchableOpacity} from "react-native";

interface Category {
    isLast?: boolean;
    title: string;
    focused: boolean;
    onClick: () => void;
}

const CategoryBadge = ({title, focused, isLast, onClick}: Category) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            style={[styles.textContainer, focused && {backgroundColor: "#efe", borderColor: "#00ff11"}, isLast && {marginRight: 20}]}
        >
            <Text style={[styles.textLabel, focused && {fontFamily: "Geist Medium"}]}>
                {title}
            </Text>
        </TouchableOpacity>
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
