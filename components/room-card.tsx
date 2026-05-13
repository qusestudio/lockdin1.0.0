import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


interface RoomCardProps {
    subject: string
    grade: string
    onJoin: () => void
}

export default function RoomCard({ subject, grade, onJoin }: RoomCardProps) {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.subject}>{subject}</Text>
                <Text style={styles.grade}>{grade}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onJoin}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginHorizontal: 0,
        marginBottom: 10,
    },
    subject: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Geist Medium',
    },
    grade: {
        fontSize: 14,
        color: '#9E9E9E',
        marginTop: 2,
        fontFamily: 'Geist',
    },
    button: {
        backgroundColor: '#39FF14',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 6 ,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
})