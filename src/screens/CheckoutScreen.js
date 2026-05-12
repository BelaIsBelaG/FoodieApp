import React, { useContext } from "react"

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView
} from "react-native"

import { FoodContext } from "../context/FoodContext"

export default function CheckoutScreen({ route, navigation }) {

    /*
    Si viene un producto individual
    desde "Comprar ahora"
    */
    const singleProduct = route.params?.product

    /*
    Obtenemos carrito y funciones globales
    */
    const {
        cart,
        clearCart,
        getCartTotal
    } = useContext(FoodContext)

    /*
    Si hay producto individual:
    usamos solo ese.
    Si no:
    usamos todo el carrito.
    */
    const products =
        singleProduct
            ? [singleProduct]
            : cart

    /*
    Calculamos subtotal
    */
    const subtotal = singleProduct

        ? singleProduct.price *
          singleProduct.quantity

        : getCartTotal()

    /*
    Valores extra simulados
    */
    const domicilio = 5000
    const impuesto = Math.round(subtotal * 0.08)

    const total =
        subtotal +
        domicilio +
        impuesto

    /*
    Simulación de pago
    */
    const handlePayment = () => {

        Alert.alert(
            "Pago exitoso 🍔",
            "Tu pedido fue realizado correctamente",
            [
                {
                    text: "OK",
                    onPress: () => {

                        /*
                        Si es checkout general:
                        vaciamos carrito
                        */
                        if (!singleProduct) {
                            clearCart()
                        }

                        navigation.navigate("Home")
                    }
                }
            ]
        )
    }

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* TÍTULO */}
            <Text style={styles.title}>
                Checkout
            </Text>

            <Text style={styles.subtitle}>
                Revisa tu pedido antes de proceder al pago
            </Text>

            {/* LISTA DE PRODUCTOS */}
            <FlatList
                data={products}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (

                    <View style={styles.productCard}>

                        {/* IMAGEN */}
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />

                        {/* INFO */}
                        <View style={styles.infoContainer}>

                            <Text style={styles.foodName}>
                                {item.name}
                            </Text>

                            <Text style={styles.foodCategory}>
                                {item.category}
                            </Text>

                            <Text style={styles.foodQuantity}>
                                Cantidad:
                                {" "}
                                {item.quantity}
                            </Text>

                            <Text style={styles.foodPrice}>
                                ${item.price * item.quantity}
                            </Text>

                        </View>

                    </View>
                )}
            />

            {/* RESUMEN */}
            <View style={styles.summaryCard}>

                <Text style={styles.summaryTitle}>
                    Resumen del pago
                </Text>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>
                        Subtotal
                    </Text>

                    <Text style={styles.summaryText}>
                        ${subtotal}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>
                        Domicilio
                    </Text>

                    <Text style={styles.summaryText}>
                        ${domicilio}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>
                        Impuestos
                    </Text>

                    <Text style={styles.summaryText}>
                        ${impuesto}
                    </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.summaryRow}>

                    <Text style={styles.totalTitle}>
                        Total
                    </Text>

                    <Text style={styles.totalPrice}>
                        ${total}
                    </Text>

                </View>

            </View>

            {/* MÉTODOS DE PAGO */}
            <View style={styles.paymentCard}>

                <Text style={styles.summaryTitle}>
                    Método de pago
                </Text>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>
                        💳 Tarjeta débito/crédito
                    </Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>
                        📱 Nequi
                    </Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>
                        🏦 Daviplata
                    </Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>
                        💵 Pago contra entrega
                    </Text>
                </View>

            </View>

            {/* BOTÓN PAGAR */}
            <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
            >
                <Text style={styles.payButtonText}>
                    Confirmar pedido
                </Text>
            </TouchableOpacity>

            {/* BOTÓN VOLVER */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>
                    Volver
                </Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 20
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#0F172A",
        marginTop: 40
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        marginTop: 8,
        marginBottom: 24
    },

    productCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 18,
        elevation: 3
    },

    image: {
        width: 120,
        height: 120
    },

    infoContainer: {
        flex: 1,
        padding: 14,
        justifyContent: "center"
    },

    foodName: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0F172A"
    },

    foodCategory: {
        marginTop: 6,
        color: "#64748B",
        fontSize: 14
    },

    foodQuantity: {
        marginTop: 10,
        fontSize: 15,
        color: "#334155",
        fontWeight: "600"
    },

    foodPrice: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "800",
        color: "#16A34A"
    },

    summaryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginTop: 10
    },

    summaryTitle: {
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 20,
        color: "#0F172A"
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14
    },

    summaryText: {
        fontSize: 16,
        color: "#334155"
    },

    separator: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 14
    },

    totalTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0F172A"
    },

    totalPrice: {
        fontSize: 24,
        fontWeight: "900",
        color: "#16A34A"
    },

    paymentCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginTop: 20
    },

    paymentOption: {
        backgroundColor: "#F1F5F9",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12
    },

    paymentText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#0F172A"
    },

    payButton: {
        backgroundColor: "#16A34A",
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 30
    },

    payButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800"
    },

    backButton: {
        backgroundColor: "#334155",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 40
    },

    backButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700"
    }

})