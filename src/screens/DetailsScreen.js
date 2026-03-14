import React from "react"
import { View, Text, Image, StyleSheet, Button } from "react-native"

export default function DetailsScreen({ route, navigation }) {

    const { food } = route.params

    return (

        <View style={styles.container}>

            <Image source={{ uri: food.image }} style={styles.image} />

            <Text style={styles.title}>{food.name}</Text>

            <Text style={styles.price}>${food.price}</Text>

            <Text style={styles.description}>
                {food.description}
            </Text>

            <Button
                title="Ir al perfil"
                onPress={() => navigation.navigate("Profile", { food })}
            />

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 12
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10
    },

    price: {
        fontSize: 20,
        color: "#27ae60",
        marginTop: 6
    },

    description: {
        marginTop: 10,
        fontSize: 16
    }

})