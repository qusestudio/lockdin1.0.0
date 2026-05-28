import React from 'react';
import {FlatList, Text, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {SignupFormData} from "@/components/signup-form";
import {HugeiconsIcon} from "@hugeicons/react-native";
import { CheckmarkCircle01Icon} from "@hugeicons/core-free-icons";

const gradeOptions: string[] = [
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
];

const GradePickerModal = ({formData, handleInputChange, visible, onClose}: {
    formData: SignupFormData,
    handleInputChange: (field: keyof SignupFormData, value: string) => void,
    visible: boolean,
    onClose: (visible: boolean) => void,
}) => {

    const selectGrade = (grade: string): void => {
        handleInputChange('grade', grade);
        onClose(false);
    };

    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => onClose(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Grade</Text>
                            <TouchableOpacity onPress={() => onClose(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={gradeOptions}
                            keyExtractor={(item: string) => item}
                            renderItem={({ item }: { item: string }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.gradeOption,
                                        formData.grade === item && styles.selectedGradeOption,
                                    ]}
                                    onPress={() => selectGrade(item)}
                                >
                                    <Text
                                        style={[
                                            styles.gradeOptionText,
                                            formData.grade === item && styles.selectedGradeOptionText,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                    {formData.grade === item && (
                                        <HugeiconsIcon icon={CheckmarkCircle01Icon} />
                                    )}
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GradePickerModal;

const styles = StyleSheet.create({
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
        borderWidth: 1,
        borderColor: "#ddd"
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Geist Medium",
        color: '#333',
    },
    closeButton: {
        fontSize: 16,
        color: '#000',
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
        backgroundColor: '#eee',
    },
    gradeOptionText: {
        fontSize: 16,
        color: '#333',
        fontFamily: "Geist",
    },
    selectedGradeOptionText: {
        color: '#000',
        fontFamily: 'Geist Medium',
    },
    checkmark: {
        fontSize: 20,
        color: '#00ff11',
    },
});
