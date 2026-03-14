import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function CategoryButton({ title, onPress, active }) {

    return (
        <TouchableOpacity
            style={[styles.button, active && styles.activeButton]}
            onPress={onPress}
        >
            <Text style={[styles.text, active && styles.activeText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default React.memo(CategoryButton);

const styles = StyleSheet.create({

    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#eee",
        borderRadius: 20,
        marginRight: 10
    },

    activeButton: {
        backgroundColor: "#ff7a00"
    },

    text: {
        fontSize: 14,
        color: "#333"
    },

    activeText: {
        color: "#fff",
        fontWeight: "bold"
    }

});