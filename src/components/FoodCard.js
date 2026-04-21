import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,

    ///Agregado: importamos Animated para animación al presionar
    Animated

} from "react-native"

///Agregado: hook para manejar animaciones
import { useRef } from "react"

function FoodCard({ item, navigation }) {

    ///Agregado: valor inicial para animación de escala
    const scale = useRef(new Animated.Value(1)).current;

    ///Agregado: animación al presionar la tarjeta
    const handlePress = () => {

        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();

        ///Se mantiene la navegación original
        navigation.navigate("Details", { food: item });
    };

    return (

        ///Agregado: envolvemos la tarjeta en Animated.View para aplicar la animación
        <Animated.View
            style={{
                flex: 1,
                marginHorizontal: 4,
                transform: [{ scale }]
            }}
        >

            <TouchableOpacity
                style={styles.card}

                ///Agregado: usamos la función con animación
                onPress={handlePress}
            >

                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>

                    <Text style={styles.name}>{item.name}</Text>

                    <Text style={styles.price}>${item.price}</Text>

                </View>

            </TouchableOpacity>

        </Animated.View>

    )
}

export default React.memo(FoodCard)

const styles = StyleSheet.create({

    ///Mejorado: tarjeta más moderna (UX/UI)
    card: {
        flex: 1,
        backgroundColor: "#1e293b", ///cambio de color (modo oscuro)
        borderRadius: 16, ///más redondeado
        overflow: "hidden",
        elevation: 4 ///mejor sombra
    },

    ///Mejorado: imagen más estética
    image: {
        width: "100%",
        height: 140
    },

    info: {
        padding: 12 ///más espacio interno
    },

    ///Mejorado: texto más legible
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },

    ///Mejorado: color más llamativo para precio
    price: {
        marginTop: 4,
        color: "#22c55e",
        fontWeight: "600"
    }

})