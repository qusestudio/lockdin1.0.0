import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Stack, useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ArrowLeft02Icon, MeetingRoomIcon} from "@hugeicons/core-free-icons";

interface RoomScreenProps {
    subject: string
    grade: string
}

export default function RoomPage() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animation: "slide_from_right"
                }}
            />
            <RoomScreen subject="Pure Mathematics" grade="Grade 10"/>
        </>
    )
}

function RoomScreen({subject = 'Pure Mathematics', grade = 'Grade 10'}: RoomScreenProps) {
    const router = useRouter()

    const handleJoin = () => {
        // TODO: trigger camera permission request here
        // then navigate into the live room
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <HugeiconsIcon icon={ArrowLeft02Icon} size={35} style={styles.backArrow}/>
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text style={styles.subject}>{subject}</Text>
                    <Text style={styles.grade}>{grade}</Text>
                </View>
            </View>

            {/* Featured Avatar Area */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                    {/* Replace with actual avatar component later */}
                    <View style={styles.avatarCircle}/>
                    <Text style={styles.avatarName}>Waiting for students...</Text>
                </View>
            </View>

            {/* Bottom Join Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.joinBtn} onPress={handleJoin}>
                    <HugeiconsIcon icon={MeetingRoomIcon} style={styles.backArrow}/>
                </TouchableOpacity>
                <Text>Join room</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },
    backBtn: {
        padding: 4,
    },
    backArrow: {},
    headerText: {
        flex: 1,
    },
    subject: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'DT Getai Display Black',
    },
    grade: {
        fontSize: 13,
        color: '#9E9E9E',
        marginTop: 2,
        fontFamily: 'Geist',
    },
    avatarContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 8,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        alignItems: 'center',
        gap: 12,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
    },
    avatarName: {
        fontSize: 14,
        color: '#9E9E9E',
        fontFamily: 'Geist',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    joinBtn: {
        backgroundColor: '#39FF14',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 30,
    },
    joinText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Geist',
    },
})