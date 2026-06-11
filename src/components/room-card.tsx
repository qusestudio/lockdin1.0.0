import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ArrowRight01Icon, User03Icon} from "@hugeicons/core-free-icons";
import PulseDot from "@/src/components/pulse-dot";
import {Room} from "@/src/api/rooms";


interface RoomCardProps {
    room: Room
    onJoin: () => void
}

export default function RoomCard({ room, onJoin }: RoomCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onJoin}>
            <View style={styles.textContainer}>

                <View style={styles.subjectRow}>
                    <Text
                        style={styles.subject}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {room.subject}
                    </Text>

                    <Text style={styles.grade}>
                        Grade {room.grade}
                    </Text>
                </View>
                <View style={styles.liveContainer}>
                    <HugeiconsIcon icon={User03Icon} fill={"#aaa"} color={"#aaa"} size={15} />
                    {/*<Text style={styles.live}>*/}
                    {/*    {liveStudents} Live*/}
                    {/*</Text>*/}
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
    subjectRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        borderBottomColor: '#f8f8f8',
        paddingVertical: 10,
        marginHorizontal: 0,
        marginBottom: 10,
        gap: '10%'
    },
    textContainer: {
        flex: 1,
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
        fontFamily: 'Chillax Medium',
        color: '#707070',
    }
})