import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    Animated,
    Pressable
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

/*
Agregado:
Usuario global desde AuthContext
*/
import { AuthContext } from "../context/AuthContext";

import { foods } from "../utils/foods";
import FoodCard from "../components/FoodCard";
import CategoryButton from "../components/CategoryButton";
import AIChatWidget from "../components/AIChatWidget";

export default function HomeScreen({ navigation }) {

    const { width } = useWindowDimensions();

    const { user } = useContext(AuthContext);

    console.log("Usuario desde AuthContext en HomeScreen:", user);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Todo");

    /*
    Animaciones
    */
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(150)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true
            }),
            Animated.timing(slide, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    /*
    Mejorado:
    Ahora aprovecha mejor pantallas grandes
    y rotación horizontal

    1 columna -> celular normal
    2 columnas -> tablets pequeñas / horizontal
    3 columnas -> tablets grandes
    */
    let numColumns = 1;

    if (width >= 700 && width < 1000) {
        numColumns = 2;
    }

    if (width >= 1000) {
        numColumns = 3;
    }

    const categories = [
        "Todo",
        "Hamburguesa",
        "Perros calientes",
        "Pizza",
        "Papas",
        "Bebidas"
    ];

    const filteredFoods = useMemo(() => {
        return foods.filter((food) => {

            const matchSearch = food.name
                .toLowerCase()
                .includes(search.toLowerCase());

            if (category === "Todo") {
                return matchSearch;
            }

            return matchSearch && food.category === category;
        });
    }, [search, category]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fade,
                    transform: [{ translateY: slide }]
                }
            ]}
        >

            {/* HEADER SUPERIOR */}
            <View style={styles.headerTop}>

                <Text style={styles.title}>
                    Food App
                </Text>

                {/* BOTÓN CIRCULAR PERFIL */}
                <Pressable
                    style={styles.profileIconButton}
                    onPress={() =>
                        navigation.navigate("Profile", {
                            food: foods[0]
                        })
                    }
                >
                    <Ionicons
                        name="person"
                        size={22}
                        color="#FFFFFF"
                    />
                </Pressable>

            </View>

            {/* BUSCADOR */}
            <TextInput
                placeholder="Buscar comida..."
                placeholderTextColor="#64748B"
                style={styles.search}
                value={search}
                onChangeText={setSearch}
            />

            {/* CATEGORÍAS */}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                style={styles.categories}
                contentContainerStyle={{
                    paddingHorizontal: 5
                }}
                renderItem={({ item }) => (
                    <CategoryButton
                        title={item}
                        onPress={() => setCategory(item)}
                        active={category === item}
                    />
                )}
            />

            <Text style={styles.section}>
                Comidas populares
            </Text>

            {/* LISTA DE COMIDAS */}
            <FlatList
                data={filteredFoods}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                key={numColumns}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={
                    numColumns > 1
                        ? {
                              justifyContent: "space-between",
                              gap: 12
                          }
                        : null
                }
                contentContainerStyle={{
                    paddingBottom: 120
                }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1 / numColumns,
                            marginBottom: 14
                        }}
                    >
                        <FoodCard
                            item={item}
                            navigation={navigation}
                        />
                    </View>
                )}
            />

            <AIChatWidget />

        </Animated.View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0f172a"
    },

    /*
    HEADER SUPERIOR
    */
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },

    /*
    TÍTULO
    */
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff"
    },

    /*
    BOTÓN CIRCULAR PERFIL
    Similar a favoritos/carrito
    */
    profileIconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center"
    },

    /*
    BUSCADOR
    */
    search: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 15
    },

    /*
    CATEGORÍAS
    */
    categories: {
        marginBottom: 15
    },

    /*
    SUBTÍTULO
    */
    section: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        color: "#e2e8f0"
    }

});