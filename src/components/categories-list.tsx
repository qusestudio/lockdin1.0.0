import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import CategoryBadge from "@/src/components/category-badge";

interface Category {
    id: string
    title: string
}

const categories: Category[] = [
    {id: '0', title: "All"},
    {id: '1', title: "Stem"},
    {id: '2', title: "Commerce"},
    {id: '3', title: "Humanities"},
    {id: '4', title: "Creative Arts"},
]

const CategoriesList = (
    {
        selectedCategory,
        handleClickedCategory
    }: {
        selectedCategory: string;
        handleClickedCategory: (category: string) => void;
    }
) => {
    return (
        <View style={{overflow: "hidden"}}>
            <FlatList
                style={styles.list}
                data={categories}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <CategoryBadge
                        onClick={() => handleClickedCategory(item.title === "All" ? "" : item.title)}
                        title={item.title}
                        isLast={index === categories.length - 1}
                        focused={item.title === "All" ? selectedCategory === "" : selectedCategory === item.title}
                    />
                )}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
        paddingHorizontal: 10,
        overflowY: "hidden",
        marginRight: 0,
        gap: 5
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
