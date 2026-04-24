import React, { useState, useContext } from "react"
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

//Agregado: importamos iconos para carrito y favoritos
import { Ionicons } from "@expo/vector-icons"

//Agregado: importamos el contexto para favoritos y carrito
import { FoodContext } from "../context/FoodContext"

//Importamos los temas segun android o ios
import colors from "../styles/theme";

export default function DetailsScreen({ route, navigation }) {

    //Recibimos food y user desde route.params
    const { food, user } = route.params

    ///Agregado: accedemos a las funciones del contexto
    ///Para guardar favoritos y carrito globalmente
    const { addToFavorites, addToCart } = useContext(FoodContext)

    ///Agregado: estado para controlar la cantidad de productos
    ///La cantidad inicia en 1 y nunca puede bajar de 1
    const [quantity, setQuantity] = useState(1)

    ///Agregado: función para aumentar cantidad
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    ///Agregado: función para disminuir cantidad
    ///Solo disminuye si la cantidad es mayor a 1
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Image source={{ uri: food.image }} style={styles.image} />

            {/* 
            Agregado: contenedor superior para título e iconos
            Ahora los iconos aparecen junto al nombre del producto
            */}
            <View style={styles.headerContainer}>

                <Text style={styles.title}>{food.name}</Text>

                {/* 
                Agregado: icono de favoritos
                Ahora se representa con corazón visual
                */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => {
                        addToFavorites(food)

                        Alert.alert(
                            "Favoritos",
                            `${food.name} fue agregado a favoritos`
                        )
                    }}
                >
                    <Ionicons
                        name="heart"
                        size={26}
                        color="white"
                    />
                </TouchableOpacity>

                {/* 
                Agregado: icono de carrito
                Ahora guarda la cantidad seleccionada
                */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => {
                        addToCart(food, quantity)

                        Alert.alert(
                            "Carrito",
                            `${quantity} ${food.name} agregado(s) al carrito`
                        )
                    }}
                >
                    <Ionicons
                        name="cart"
                        size={26}
                        color="white"
                    />
                </TouchableOpacity>

            </View>

            <Text style={styles.price}>${food.price}</Text>

            <Text style={styles.description}>
                {food.description}
            </Text>

            {/* 
            Agregado: selector de cantidad de productos
            Incluye botón -, cantidad actual y botón +
            La cantidad nunca puede ser menor a 1
            */}
            <View style={styles.quantitySection}>

                <Text style={styles.quantityTitle}>
                    Cantidad
                </Text>

                <View style={styles.quantityContainer}>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={decreaseQuantity}
                    >
                        <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>
                        {quantity}
                    </Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>

                </View>

            </View>

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
            Agregado: botón con feedback (Alert)
            Ahora el usuario recibe confirmación de la acción
            */}
            <Button
                title="Ir al perfil"
                onPress={() => {
                    Alert.alert("Acción realizada", "Redirigiendo al perfil 👤");
                    navigation.navigate("Profile", {
                        food,
                        user
                    });
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

    /* 
    Agregado: contenedor del título e iconos
    Permite alinear nombre + favoritos + carrito
    */
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 10
    },

    title: {
        flex: 1,
        fontSize: 26,
        fontWeight: "bold",
        color: colors.text
    },

    /* 
    Agregado: botón circular para iconos
    Hace que los iconos resalten visualmente
    */
    iconButton: {
        backgroundColor: "#2563EB",
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4
    },

    price: {
        fontSize: 20,
        color: "#22c55e",
        marginTop: 10,
        fontWeight: "600"
    },

    description: {
        marginTop: 10,
        fontSize: 16,
        color: colors.subtitle,
        marginBottom: 20
    },

    /* 
    Agregado: sección del selector de cantidad
    Diseño profesional para aumentar o disminuir productos
    */
    quantitySection: {
        marginTop: 10,
        marginBottom: 20
    },

    quantityTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 12
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 18
    },

    quantityButton: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center"
    },

    quantityButtonText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold"
    },

    quantityText: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text,
        minWidth: 30,
        textAlign: "center"
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