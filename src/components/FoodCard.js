import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

function FoodCard({ item, navigation }) {

    return (

        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { food: item })}
        >

            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>

                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.price}>${item.price}</Text>

            </View>

        </TouchableOpacity>

    )
}

export default React.memo(FoodCard)

const styles = StyleSheet.create({

    card: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 8,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 3
    },

    image: {
        width: "100%",
        height: 140
    },

    info: {
        padding: 10
    },

    name: {
        fontSize: 16,
        fontWeight: "bold"
    },

    price: {
        marginTop: 4,
        color: "#27ae60"
    }

})