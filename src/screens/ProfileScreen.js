import React, { useRef, useState, useContext } from "react"
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native"

import { CameraView, useCameraPermissions } from "expo-camera"
import * as MediaLibrary from "expo-media-library"

/*
Agregado:
Importamos ImagePicker para permitir
elegir una foto desde la galería
*/
import * as ImagePicker from "expo-image-picker"

//Agregado: importamos el contexto para favoritos y carrito
import { FoodContext } from "../context/FoodContext"

/*
Agregado:
Importamos AuthContext para obtener
el usuario real que inició sesión
*/
import { AuthContext } from "../context/AuthContext"

//Importamos los temas segun android o ios
import colors from "../styles/theme";

export default function ProfileScreen({ route, navigation }) {

    /*
    Corregido:
    Ya NO dependemos de route.params.user
    porque muchas veces llega undefined.

    Ahora obtenemos el usuario directamente
    desde AuthContext para que siempre aparezca
    correctamente en el perfil.
    */
    const { food } = route.params || {}

    /*
    Agregado:
    Usuario global desde contexto de autenticación
    */
    const { user } = useContext(AuthContext)

    //Agregado: obtenemos favoritos y carrito desde el contexto global
    //También obtenemos funciones para aumentar y disminuir cantidades
    const {
        favorites,
        cart,
        increaseCartQuantity,
        decreaseCartQuantity
    } = useContext(FoodContext)

    //Referencia de la cámara
    const cameraRef = useRef(null)

    //Permisos de cámara
    const [cameraPermission, requestCameraPermission] = useCameraPermissions()

    //Permisos de galería
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()

    //Estado para guardar la foto tomada
    const [photoUri, setPhotoUri] = useState(null)

    //Estado para mostrar u ocultar modal de cámara
    const [cameraVisible, setCameraVisible] = useState(false)

    /*
    Agregado:
    Esta será la foto final del perfil
    que se mostrará en el avatar
    */
    const [profileImage, setProfileImage] = useState(null)

    /*
    Agregado:
    Datos de respaldo para evitar
    que aparezca "no disponible"
    */
    const displayName =
        user?.name || "Usuario prueba FoodieApp"

    const displayEmail =
        user?.email || "foodieapp@test.com"

    //Función para tomar foto
    const takePhoto = async () => {
        if (!cameraRef.current) return

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
            })

            setPhotoUri(photo.uri)

        } catch (error) {
            console.log("Error al tomar la foto:", error)
        }
    }

    /*
    Agregado:
    Permite elegir una imagen
    desde la galería del celular
    */
    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            })

            if (!result.canceled) {
                setProfileImage(result.assets[0].uri)

                Alert.alert(
                    "Foto de perfil",
                    "Imagen seleccionada correctamente"
                )
            }

        } catch (error) {
            console.log("Error al elegir imagen:", error)
        }
    }

    //Función para guardar foto en galería
    const savePhoto = async () => {
        try {
            if (!photoUri) return

            if (!mediaPermission?.granted) {
                await requestMediaPermission()
            }

            await MediaLibrary.saveToLibraryAsync(photoUri)

            /*
            Agregado:
            Ahora también guardamos esa foto
            como imagen de perfil dentro de la app
            */
            setProfileImage(photoUri)

            Alert.alert(
                "Foto de perfil",
                "Foto guardada correctamente"
            )

            setCameraVisible(false)
            setPhotoUri(null)

        } catch (error) {
            console.log("Error al guardar la foto:", error)
        }
    }

    return (
        <View style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* INFORMACIÓN DEL PERFIL DEL USUARIO */}
                <Text style={styles.title}>Mi Perfil</Text>

                <Text style={styles.subtitle}>
                    Gestiona tu cuenta, tus favoritos y todo lo que agregaste al carrito
                </Text>

                {/* TARJETA PRINCIPAL DEL PERFIL */}
                <View style={styles.profileCard}>

                    {/* FOTO DE PERFIL */}
                    <View style={styles.avatarContainer}>

                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Text style={styles.avatarText}>
                                {displayName.charAt(0).toUpperCase()}
                            </Text>
                        )}

                    </View>

                    {/* BOTÓN PARA ABRIR CÁMARA */}
                    <Pressable
                        style={styles.actionButton}
                        onPress={() => setCameraVisible(true)}
                    >
                        <Text style={styles.actionButtonText}>
                            Cambiar foto de perfil
                        </Text>
                    </Pressable>

                    {/* BOTÓN PARA ELEGIR DESDE GALERÍA */}
                    <Pressable
                        style={styles.galleryButton}
                        onPress={pickImageFromGallery}
                    >
                        <Text style={styles.actionButtonText}>
                            Elegir desde galería
                        </Text>
                    </Pressable>

                    {/* Agregado: mostramos nombre del usuario que inició sesión */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Nombre del usuario</Text>
                        <Text style={styles.userInfo}>
                            {displayName}
                        </Text>
                    </View>

                    {/* Agregado: mostramos correo del usuario */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <Text style={styles.userInfo}>
                            {displayEmail}
                        </Text>
                    </View>

                    {/* Agregado: última comida vista */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Última comida vista</Text>
                        <Text style={styles.food}>
                            {food?.name || "Sin información"}
                        </Text>
                    </View>

                    {/* FAVORITOS */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Favoritos</Text>

                        {favorites.length > 0 ? (
                            favorites.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.favoriteCard}
                                    onPress={() =>
                                        navigation.navigate("Details", {
                                            food: item
                                        })
                                    }
                                >
                                    <Text style={styles.userInfo}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>
                                No hay favoritos guardados
                            </Text>
                        )}
                    </View>

                    {/* CARRITO */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.label}>Carrito</Text>

                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <View
                                    key={index}
                                    style={styles.cartCard}
                                >

                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Details", {
                                                food: item
                                            })
                                        }
                                    >
                                        <Text style={styles.userInfo}>
                                            🛒 {item.name}
                                        </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.cartDetail}>
                                        Cantidad: {item.quantity}
                                    </Text>

                                    <Text style={styles.cartDetail}>
                                        Total: ${item.price * item.quantity}
                                    </Text>

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

                                    <TouchableOpacity
                                        style={styles.checkoutButton}
                                        onPress={() =>
                                            Alert.alert(
                                                "Comprar",
                                                `Comprar ${item.name}`
                                            )
                                        }
                                    >
                                        <Text style={styles.checkoutText}>
                                            Checkout
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>
                                El carrito está vacío
                            </Text>
                        )}
                    </View>
                    {/* BOTÓN CERRAR SESIÓN */}
                    <Pressable
                        style={styles.logoutButton}
                        onPress={() => {
                            Alert.alert(
                                "Cerrar sesión",
                                "Redirigiendo al inicio de sesión 👤",
                                [
                                    {
                                        text: "Cancelar",
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: "Auth" }]
                                            })
                                        }
                                    }
                                ]
                            )
                        }}
                    >
                        <Text style={styles.actionButtonText}>
                            Cerrar sesión
                        </Text>
                    </Pressable>
                </View>

            </ScrollView>

            {/* MODAL DE CÁMARA */}
            <Modal visible={cameraVisible} animationType="slide">

                <View style={styles.cameraContainer}>

                    {!cameraPermission ? (
                        <Text>Cargando permisos...</Text>
                    ) : !cameraPermission.granted ? (
                        <>
                            <Text style={styles.permissionText}>
                                Necesitamos permiso para usar la cámara
                            </Text>

                            <Pressable
                                style={styles.actionButton}
                                onPress={requestCameraPermission}
                            >
                                <Text style={styles.actionButtonText}>
                                    Permitir cámara
                                </Text>
                            </Pressable>
                        </>
                    ) : !photoUri ? (
                        <>
                            <CameraView
                                ref={cameraRef}
                                style={styles.camera}
                                facing="back"
                            />

                            <Pressable
                                style={styles.actionButton}
                                onPress={takePhoto}
                            >
                                <Text style={styles.actionButtonText}>
                                    Tomar foto
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Image
                                source={{ uri: photoUri }}
                                style={styles.preview}
                            />

                            <View style={styles.controls}>
                                <Pressable
                                    style={styles.secondaryButton}
                                    onPress={() => setPhotoUri(null)}
                                >
                                    <Text style={styles.actionButtonText}>
                                        Tomar otra
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={styles.actionButton}
                                    onPress={savePhoto}
                                >
                                    <Text style={styles.actionButtonText}>
                                        Guardar
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )}

                    <Pressable
                        style={styles.closeButton}
                        onPress={() => {
                            setCameraVisible(false)
                            setPhotoUri(null)
                        }}
                    >
                        <Text style={styles.actionButtonText}>
                            Cerrar
                        </Text>
                    </Pressable>

                </View>
            </Modal>

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC"
    },

    scrollContent: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 40
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: 8
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        marginBottom: 28,
        lineHeight: 22
    },

    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4
    },

    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 24,
        overflow: "hidden"
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 34,
        fontWeight: "800"
    },

    /*
    Agregado:
    Imagen real del perfil
    */
    profileImage: {
        width: "100%",
        height: "100%"
    },

    /*
    Agregado:
    Botón de galería manteniendo
    estilos similares a los existentes
    */
    galleryButton: {
        backgroundColor: "#334155",
        paddingVertical: 16,
        borderRadius: 14,
        marginTop: 14,
        alignItems: "center",
        marginBottom: 20
    },

    infoBlock: {
        marginBottom: 18,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0"
    },

    label: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 6,
        fontWeight: "600"
    },

    userInfo: {
        fontSize: 17,
        color: "#0F172A",
        fontWeight: "600",
        marginTop: 4
    },

    food: {
        fontSize: 17,
        color: "#16A34A",
        fontWeight: "700"
    },

    favoriteCard: {
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 12,
        marginTop: 10
    },

    cartCard: {
        backgroundColor: "#F8FAFC",
        padding: 16,
        borderRadius: 14,
        marginTop: 14
    },

    cartDetail: {
        marginTop: 6,
        fontSize: 15,
        color: "#475569",
        fontWeight: "500"
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        gap: 16
    },

    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center"
    },

    quantityButtonText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold"
    },

    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F172A"
    },

    checkoutButton: {
        marginTop: 16,
        backgroundColor: "#111827",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center"
    },

    checkoutText: {
        color: "white",
        fontWeight: "700",
        fontSize: 15
    },

    emptyText: {
        fontSize: 15,
        color: "#64748B",
        fontStyle: "italic",
        marginTop: 4
    },

    actionButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 14,
        marginTop: 28,
        alignItems: "center"
    },

    actionButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15
    },

    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F8FAFC"
    },

    camera: {
        flex: 1,
        borderRadius: 18,
        overflow: "hidden"
    },

    preview: {
        flex: 1,
        borderRadius: 18
    },

    controls: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginTop: 20
    },

    secondaryButton: {
        backgroundColor: "#334155",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14
    },

    permissionText: {
        color: "#475569",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 15
    },

    closeButton: {
        backgroundColor: "#DC2626",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20
    },

    logoutButton: {
        backgroundColor: "#DC2626",
        paddingVertical: 16,
        borderRadius: 14,
        marginTop: 20,
        alignItems: "center"
    },

})