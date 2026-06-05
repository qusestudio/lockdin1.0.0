import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/src/components/search-bar";
import RoomCard from "@/src/components/room-card";
import {useRouter} from "expo-router";
import CategoriesList from "@/src/components/categories-list";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {
    Menu03Icon,
} from "@hugeicons/core-free-icons";
import {useRooms} from "@/src/hooks/useRooms";
import {useEffect, useState} from "react";

export default function DiscoverRoomsScreen() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const { data = [], isFetching, isLoading, refetch } = useRooms({
        subjectCategory: category,
        search: debouncedSearch,
    });

    const isInitialLoading = isLoading && data.length === 0;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 20}}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10}}>
                        <Text style={{fontFamily: "DT Getai Grotesk Display Black", fontSize: 25}}>
                            Lockdin
                        </Text>
                        <Text style={{fontSize: 18, marginTop: -2, fontFamily: "DT Getai Grotesk Display Black"}}>®</Text>
                    </View>
                    <Text style={{marginTop: -2, fontFamily: "Geist Medium", color: "#555"}}>
                        Discover rooms
                    </Text>
                </View>
                <View style={{
                    borderRadius: 16,
                    backgroundColor: "#fff",
                    elevation: 8,
                    shadowColor: "#555",
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                }}>
                    <View style={{
                        borderRadius: 50,
                        overflow: "hidden",
                        padding: 10,
                    }}>
                        <HugeiconsIcon icon={Menu03Icon}/>
                    </View>
                </View>
            </View>

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />
            <CategoriesList
                selectedCategory={category}
                handleClickedCategory={setCategory}
            />
            <View>
                {/*<Text style={{fontFamily: "Geist", fontSize: 15}}>Rooms</Text>*/}
                {
                    !isInitialLoading && data.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text>
                                No results found
                            </Text>
                        </View>
                    )
                }
                {isInitialLoading ? (
                    <RoomsSkeleton/>
                ) : (
                    <FlatList
                        style={styles.list}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <RoomCard
                                room={item}
                                onJoin={() => router.push(`/room/${item.id}`,)}
                            />
                        )}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={refetch}
                                tintColor="#39FF14"
                                colors={["#39FF14"]}
                            />
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

function RoomsSkeleton() {
    return (
        <View style={styles.skeletonList}>
            {Array.from({length: 6}).map((_, index) => (
                <View key={index} style={styles.skeletonCard}>
                    <View style={styles.skeletonTextContainer}>
                        <View style={styles.skeletonSubject}/>
                        <View style={styles.skeletonGrade}/>
                        <View style={styles.skeletonMeta}/>
                    </View>
                    <View style={styles.skeletonButton}/>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
        marginBottom: 200,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    skeletonList: {
        paddingHorizontal: 20,
        marginBottom: 200,
    },
    skeletonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 10,
        gap: '10%',
    },
    skeletonTextContainer: {
        flex: 1,
        gap: 10,
    },
    skeletonSubject: {
        width: '62%',
        height: 18,
        borderRadius: 6,
        backgroundColor: '#EDEDED',
    },
    skeletonGrade: {
        width: '34%',
        height: 14,
        borderRadius: 6,
        backgroundColor: '#F2F2F2',
    },
    skeletonMeta: {
        width: 54,
        height: 15,
        borderRadius: 6,
        backgroundColor: '#F2F2F2',
    },
    skeletonButton: {
        width: 28,
        height: 24,
        borderRadius: 20,
        backgroundColor: '#EDEDED',
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
