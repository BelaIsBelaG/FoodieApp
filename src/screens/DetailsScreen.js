import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity,

    ///Agregado: importamos Alert para feedback al usuario
    Alert

} from "react-native"

//Importamos los temas segun android o ios
import colors from "../styles/theme";

export default function DetailsScreen({ route, navigation }) {

    const { food } = route.params

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Image source={{ uri: food.image }} style={styles.image} />

            <Text style={styles.title}>{food.name}</Text>

            <Text style={styles.price}>${food.price}</Text>

            <Text style={styles.description}>
                {food.description}
            </Text>

            {/* 
            Agregado: sección para mostrar los ingredientes
            Ahora cada producto muestra sus ingredientes en la vista de detalles
            */}
            <Text style={styles.ingredientsTitle}>
                Ingredientes
            </Text>

            {/* 
            Agregado: mostramos los ingredientes en formato lista
            Si es un array se muestran uno debajo del otro
            */}
            {food.ingredients && Array.isArray(food.ingredients) ? (
                food.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredients}>
                        • {ingredient}
                    </Text>
                ))
            ) : (
                <Text style={styles.ingredients}>
                    {food.ingredients}
                </Text>
            )}

            {/* 
            Agregado: botones para favoritos y carrito
            Permite guardar productos para después o pedirlos en el momento
            */}
            <View style={styles.actionsContainer}>

                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() =>
                        Alert.alert(
                            "Favoritos",
                            `${food.name} fue agregado a favoritos`
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        Agregar a favoritos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() =>
                        Alert.alert(
                            "Carrito",
                            `${food.name} fue agregado al carrito`
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        Agregar al carrito
                    </Text>
                </TouchableOpacity>

            </View>

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

        </ScrollView>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 16,
        marginBottom: 10
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.text
    },

    price: {
        fontSize: 20,
        color: "#22c55e",
        marginTop: 6,
        fontWeight: "600"
    },

    description: {
        marginTop: 10,
        fontSize: 16,
        color: colors.subtitle,
        marginBottom: 20
    },

    ///Agregado: estilos para el título de ingredientes
    ingredientsTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text
    },

    ///Agregado: estilos para el texto de ingredientes
    ingredients: {
        marginTop: 6,
        fontSize: 15,
        color: colors.subtitle,
        lineHeight: 22,
        marginBottom: 4
    },

    ///Agregado: contenedor para botones de acciones
    actionsContainer: {
        marginTop: 20,
        marginBottom: 25,
        gap: 12
    },

    ///Agregado: botón favoritos
    favoriteButton: {
        backgroundColor: "#1D4ED8",
        padding: 14,
        borderRadius: 12,
        alignItems: "center"
    },

    ///Agregado: botón carrito
    cartButton: {
        backgroundColor: "#16A34A",
        padding: 14,
        borderRadius: 12,
        alignItems: "center"
    },

    ///Agregado: texto de botones
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    }

})