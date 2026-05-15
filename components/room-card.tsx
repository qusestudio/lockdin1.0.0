import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ArrowRight01Icon, User03Icon} from "@hugeicons/core-free-icons";
import PulseDot from "@/components/pulse-dot";


interface RoomCardProps {
    subject: string
    grade: string
    liveStudents: number
    onJoin: () => void
}

export default function RoomCard({ subject, grade, liveStudents, onJoin }: RoomCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onJoin}>
            <View style={styles.textContainer}>

                <View style={{alignItems: "center", flexDirection: "row", gap: 5}}>
                    <Text style={styles.subject}>{subject}</Text>
                    <Text style={styles.grade}>
                        {grade}
                    </Text>
                </View>
                <View style={styles.liveContainer}>
                    <HugeiconsIcon icon={User03Icon} fill={"#aaa"} color={"#aaa"} size={15} />
                    <Text style={styles.live}>
                        {liveStudents} Live
                    </Text>
                    <PulseDot />
                </View>
            </View>
            <View style={styles.button} >
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        borderBottomColor: '#f8f8f8',
        paddingVertical: 10,
        marginHorizontal: 0,
        marginBottom: 10,
    },
    textContainer: {
        gap: 10
    },
    subject: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Geist Medium',
    },
    grade: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 14,
        color: '#9E9E9E',
        marginTop: 2,
        fontFamily: 'Geist Medium',
    },
    button: {
        borderWidth: 1,
        borderColor: '#aEaEaE',
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 3 ,
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },
    liveContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    live: {
        fontSize: 13,
        fontFamily: 'Geist Medium',
        color: '#707070',
    }
})