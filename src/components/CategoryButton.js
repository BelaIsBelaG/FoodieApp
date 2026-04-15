import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function CategoryButton({ title, onPress, active }) {

    return (
        <TouchableOpacity
            style={[
                styles.button,
                active && styles.activeButton
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.text,
                active && styles.activeText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default React.memo(CategoryButton);

const styles = StyleSheet.create({

    ///Mejorado: tamaño consistente del botón (evita deformaciones)
    button: {
        minWidth: 110, ///Agregado: ancho mínimo para que no se achique
        height: 45, ///Agregado: altura fija para uniformidad
        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 15,

        backgroundColor: "#e5e7eb",
        borderRadius: 25,

        marginRight: 10
    },

    ///Mejorado: botón activo más visible
    activeButton: {
        backgroundColor: "#ff7a00"
    },

    ///Mejorado: texto centrado y legible
    text: {
        fontSize: 14,
        color: "#333",
        textAlign: "center"
    },

    ///Mejorado: contraste en activo
    activeText: {
        color: "#fff",
        fontWeight: "bold"
    }

});