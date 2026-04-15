import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button } from "react-native"

export default function ProfileScreen({ route }) {

    const { food } = route.params

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Perfil</Text>
            <Text>Última comida vista:</Text>
            <Text style={styles.food}>{food.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold"
    },

    food: {
        fontSize: 20,
        marginTop: 10
    }

})