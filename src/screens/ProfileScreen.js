import React, { useRef, useState } from "react"
import { View, Text, StyleSheet, Pressable, Image, Modal } from "react-native"
import { Button } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import * as MediaLibrary from "expo-media-library"

export default function ProfileScreen({ route }) {

    const { food } = route.params

    const cameraRef = useRef(null)

    const [cameraPermission, requestCameraPermission] = useCameraPermissions()
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()

    const [photoUri, setPhotoUri] = useState(null)
    const [cameraVisible, setCameraVisible] = useState(false)

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

    const savePhoto = async () => {
        try {
            if (!photoUri) return

            if (!mediaPermission?.granted) {
                await requestMediaPermission()
            }

            await MediaLibrary.saveToLibraryAsync(photoUri)
            alert("Foto guardada en la galería")

        } catch (error) {
            console.log("Error al guardar la foto:", error)
        }
    }

    return (
        <View style={styles.container}>

            {/* CONTENIDO ORIGINAL (NO SE MODIFICA) */}
            <Text style={styles.title}>Perfil</Text>
            <Text style={styles.label}>Última comida vista:</Text>
            <Text style={styles.food}>{food.name}</Text>

            {/* BOTÓN NUEVO */}
            <Pressable
                style={styles.actionButton}
                onPress={() => setCameraVisible(true)}
            >
                <Text style={styles.actionButtonText}>Abrir cámara</Text>
            </Pressable>

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
                        <Text style={styles.actionButtonText}>Cerrar</Text>
                    </Pressable>

                </View>
            </Modal>

        </View>
    )
}

//Ajustamos los colores de la página del perfil para que vayan más acorde con la interfaz de la aplicación
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0B1A2B"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    },

    food: {
        fontSize: 20,
        marginTop: 10,
        color: "white"
    },

    actionButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginTop: 20
    },

    actionButtonText: {
        color: "white",
        fontWeight: "700"
    },

    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#0B1A2B"
    },

    camera: {
        flex: 1,
        borderRadius: 14,
        overflow: "hidden"
    },

    preview: {
        flex: 1,
        borderRadius: 14
    },

    controls: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginTop: 20
    },

    secondaryButton: {
        backgroundColor: "#1F2937",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14
    },

    permissionText: {
        color: "#D1D5DB",
        textAlign: "center",
        marginBottom: 20
    },

    closeButton: {
        backgroundColor: "#DC2626",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20
    },

    label: {
    color: "#22C55E",
    fontSize: 14,
    marginTop: 6
}

})