import React, { useContext, useState } from "react"

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    TextInput
} from "react-native"

import { FoodContext } from "../context/FoodContext"

export default function CheckoutScreen({ route, navigation }) {

    /*
    Si viene un producto individual
    desde "Comprar ahora"
    */
    const singleProduct = route.params?.product

    /*
    Dirección editable
    */
    const [address, setAddress] = useState(
        route.params?.address ||
        "Sin dirección registrada"
    )

    /*
    Obtenemos carrito y funciones globales
    */
    const {
        cart,
        clearCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
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
    const subtotal = products.reduce(
        (acc, item) =>
            acc + (item.price * item.quantity),
        0
    )

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

        if (!address.trim()) {
            Alert.alert(
                "Dirección requerida",
                "Por favor ingresa una dirección de entrega"
            )
            return
        }

        if (products.length === 0) {
            Alert.alert(
                "Carrito vacío",
                "Agrega productos antes de pagar"
            )
            return
        }

        Alert.alert(
            "Pago exitoso 🍔",
            "Tu pedido fue realizado correctamente",
            [
                {
                    text: "Ver detalle",
                    onPress: () => {

                        if (!singleProduct) {
                            clearCart()
                        }

                        Alert.alert(
                            "Resumen del pedido 📦",
                            `Dirección de entrega:\n${address}\n\nTotal pagado: $${total}`
                        )

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

                            {/* CONTROLES DE CANTIDAD */}
                            <View style={styles.quantityContainer}>

                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() =>
                                        decreaseCartQuantity(item.id)
                                    }
                                >
                                    <Text style={styles.quantityButtonText}>
                                        -
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.quantityText}>
                                    {item.quantity}
                                </Text>

                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() =>
                                        increaseCartQuantity(item.id)
                                    }
                                >
                                    <Text style={styles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>

                            </View>

                            {/* ELIMINAR PRODUCTO */}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                <Text style={styles.deleteButtonText}>
                                    🗑 Eliminar producto
                                </Text>
                            </TouchableOpacity>

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
                    <Text style={styles.summaryText}>Subtotal</Text>
                    <Text style={styles.summaryText}>${subtotal}</Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Domicilio</Text>
                    <Text style={styles.summaryText}>${domicilio}</Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Impuestos</Text>
                    <Text style={styles.summaryText}>${impuesto}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.summaryRow}>
                    <Text style={styles.totalTitle}>Total</Text>
                    <Text style={styles.totalPrice}>${total}</Text>
                </View>

            </View>

            {/* DIRECCIÓN */}
            <View style={styles.addressCard}>

                <Text style={styles.summaryTitle}>
                    Dirección de entrega
                </Text>

                <TextInput
                    style={styles.addressInput}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Ingresa dirección de entrega"
                    multiline
                />

                <Text style={styles.addressHelper}>
                    Puedes modificar la dirección antes de confirmar el pedido
                </Text>

            </View>

            {/* MÉTODOS DE PAGO */}
            <View style={styles.paymentCard}>

                <Text style={styles.summaryTitle}>
                    Método de pago
                </Text>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>💳 Tarjeta débito/crédito</Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>📱 Nequi</Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>🏦 Daviplata</Text>
                </View>

                <View style={styles.paymentOption}>
                    <Text style={styles.paymentText}>💵 Pago contra entrega</Text>
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

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        gap: 16
    },

    quantityButton: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center"
    },

    quantityButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800"
    },

    quantityText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0F172A"
    },

    deleteButton: {
        marginTop: 14,
        backgroundColor: "#DC2626",
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center"
    },

    deleteButtonText: {
        color: "#fff",
        fontWeight: "700"
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

    addressCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        marginTop: 20
    },

    addressInput: {
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 14,
        padding: 14,
        fontSize: 15,
        color: "#0F172A",
        minHeight: 70,
        textAlignVertical: "top"
    },

    addressHelper: {
        marginTop: 8,
        color: "#64748B",
        fontSize: 13
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
        color: "#fff",
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
        color: "#fff",
        fontSize: 16,
        fontWeight: "700"
    }

})