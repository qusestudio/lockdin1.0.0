import {FlatList, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/search-bar";
import RoomCard from "@/components/room-card";
import {useRouter} from "expo-router";
import CategoriesList from "@/components/categories-list";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {
    Menu03Icon,
} from "@hugeicons/core-free-icons";

interface Room {
    id: string
    subject: string
    grade: string
    liveStudents: number
}

const rooms: Room[] = [
    {id: '1', subject: 'Pure Mathematics', grade: 'Grade 10', liveStudents: 245},
    {id: '2', subject: 'Life Sciences', grade: 'Grade 10', liveStudents: 156},
    {id: '3', subject: 'Physical Sciences', grade: 'Grade 10', liveStudents: 434},
    {id: '4', subject: 'English Home Language', grade: 'Grade 10', liveStudents: 967},
    {id: '5', subject: 'History', grade: 'Grade 10', liveStudents: 578},
    {id: '6', subject: 'Geography', grade: 'Grade 10', liveStudents: 1102},
    {id: '7', subject: 'Information Technology', grade: 'Grade 10', liveStudents: 813},
    {id: '8', subject: 'Mathematics Literacy', grade: 'Grade 10', liveStudents: 265},
    {id: '9', subject: 'Geography', grade: 'Grade 10', liveStudents: 790},
    {id: '10', subject: 'Consumer Studies', grade: 'Grade 10', liveStudents: 1240},
    {id: '11', subject: 'Accounting', grade: 'Grade 10', liveStudents: 742},
    {id: '12', subject: 'Economics', grade: 'Grade 10', liveStudents: 872},
    {id: '13', subject: 'Business Studies', grade: 'Grade 10', liveStudents: 650},
]

export default function DiscoverRoomsScreen() {
    const router = useRouter();

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

            <SearchBar/>
            <CategoriesList/>
            <View>
                {/*<Text style={{fontFamily: "Geist", fontSize: 15}}>Rooms</Text>*/}
                <FlatList
                    style={styles.list}
                    data={rooms}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <RoomCard
                            subject={item.subject}
                            grade={item.grade}
                            liveStudents={item.liveStudents}
                            onJoin={() => router.push(`/room/${item.id}`,)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
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
