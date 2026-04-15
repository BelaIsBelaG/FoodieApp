import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,

    ///Agregado: importamos Alert para feedback al usuario
    Alert

} from "react-native"

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

            {/* 
            Agregado: botón con feedback (Alert)
            Ahora el usuario recibe confirmación de la acción
            */}
            <Button
                title="Ir al perfil"
                onPress={() => {
                    Alert.alert("Acción realizada", "Redirigiendo al perfil 👤");
                    navigation.navigate("Profile", { food });
                }}
            />

        </View>

    )

}

const styles = StyleSheet.create({

    ///Mejorado: fondo oscuro para coherencia con HomeScreen
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0f172a"
    },

    ///Mejorado: imagen con mejor presentación
    image: {
        width: "100%",
        height: 250,
        borderRadius: 16,
        marginBottom: 10
    },

    ///Mejorado: título más visible (jerarquía visual)
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
        color: "#fff"
    },

    ///Mejorado: color llamativo para precio
    price: {
        fontSize: 20,
        color: "#22c55e",
        marginTop: 6,
        fontWeight: "600"
    },

    ///Mejorado: texto más legible
    description: {
        marginTop: 10,
        fontSize: 16,
        color: "#cbd5f5",
        marginBottom: 20
    }

})