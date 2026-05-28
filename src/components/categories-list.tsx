import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import CategoryBadge from "@/src/components/category-badge";

interface Category {
    id: string
    title: string
    focused: boolean
}

const categories: Category[] = [
    {id: '0', title: "All", focused: true},
    {id: '1', title: "Stem", focused: false},
    {id: '2', title: "Commerce", focused: false},
    {id: '3', title: "Humanities", focused: false},
    {id: '4', title: "Creative Arts", focused: false},
]

const CategoriesList = () => {
    return (
        <View style={{overflow: "hidden"}}>
            <FlatList
                style={styles.list}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <CategoryBadge title={item.title} focused={item.focused} />
                )}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{right: Number.MIN_VALUE}}
            />
        </View>
    );
};

export default CategoriesList;

const styles = StyleSheet.create({
    list: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 10,
        overflowY: "hidden",
        marginRight: 10
    },
    safeAreaContainer: {
        flex: 1,
        gap: 5,
        backgroundColor: "#fff",
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});