import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ArrowDownFreeIcons} from "@hugeicons/core-free-icons";

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    placeholder: string;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    isGradeField?: boolean;
    setShowGradePicker?: (show: boolean) => void;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   value,
                                                   onChangeText,
                                                   error,
                                                   placeholder,
                                                   keyboardType = 'default',
                                                   isGradeField = false,
                                                   setShowGradePicker,
                                               }) => (
    <View>
        {/*<Text style={styles.label}>{label}</Text>*/}
        {isGradeField ? (
            <TouchableOpacity
                style={[styles.input, styles.gradeSelector, error && styles.inputError]}
                onPress={ setShowGradePicker ? () => setShowGradePicker(true) : undefined }
            >
                <Text style={value ? styles.gradeText : styles.placeholderText}>
                    {value || placeholder}
                </Text>
                <Text style={styles.dropdownArrow}>
                    <HugeiconsIcon icon={ArrowDownFreeIcons} />
                </Text>
            </TouchableOpacity>
        ) : (
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor="#999"
                cursorColor={"#000"}
                autoCapitalize={label === 'Name' || label === 'School Name' ? 'words' : 'none'}
            />
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
);

export default InputField;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#000'
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 12,
        fontSize: 15,
        backgroundColor: '#fafafa',
        color: '#333',
        fontFamily: 'Geist',
    },
    inputError: {
        borderColor: '#ff4444',
    },
    gradeSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gradeText: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'Geist',
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
    },
    dropdownArrow: {
        fontSize: 14,
        color: '#666',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '90%',
        maxHeight: '70%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
        padding: 5,
    },
    gradeOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 2,
    },
    selectedGradeOption: {
        backgroundColor: '#e3f2fd',
    },
    gradeOptionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedGradeOptionText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    checkmark: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
    },
});