import { View, TextInput, StyleSheet } from 'react-native'
import { Search01Icon } from '@hugeicons/core-free-icons'
import {HugeiconsIcon} from "@hugeicons/react-native";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search subject room..."
                placeholderTextColor="#9E9E9E"
                style={styles.input}
            />
            <HugeiconsIcon icon={Search01Icon} size={20} color="#9E9E9E" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        fontFamily: 'Geist',
    },
})