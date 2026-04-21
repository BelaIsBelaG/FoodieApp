import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    useWindowDimensions,

    ///Agregado: importamos Animated para animaciones
    Animated

} from "react-native";

///Agregado: hooks necesarios para animaciones
import { useRef, useEffect } from "react";

import { foods } from "../utils/foods";
import FoodCard from "../components/FoodCard";
import CategoryButton from "../components/CategoryButton";
import AIChatWidget from "../components/AIChatWidget";

export default function HomeScreen({ navigation }) {

    const { width } = useWindowDimensions();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Todo");

    ///Mejorado: aumentamos el desplazamiento para que se note más la animación
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(150)).current; ///antes era 50

    ///Mejorado: animación más lenta y visible
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {
                toValue: 1,
                duration: 1200, ///antes 800
                useNativeDriver: true
            }),
            Animated.timing(slide, {
                toValue: 0,
                duration: 1200, ///antes 800
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const numColumns = width > 600 ? 2 : 1;

    const categories = ["Todo", "Hamburguesa", "Perros calientes", "Pizza", "Papas", "Bebidas"];

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

        ///Agregado: Animated.View para aplicar animación de entrada
        <Animated.View style={[
            styles.container,
            {
                opacity: fade,
                transform: [{ translateY: slide }]
            }
        ]}>

            <Text style={styles.title}>Food App</Text>

            <TextInput
                placeholder="Buscar comida..."
                style={styles.search}
                value={search}
                onChangeText={setSearch}
            />

            {/* Categorías */}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                style={styles.categories}

                ///Agregado: mejora distribución de botones (UX)
                contentContainerStyle={{ paddingHorizontal: 5 }}

                renderItem={({ item }) => (
                    <CategoryButton
                        title={item}
                        onPress={() => setCategory(item)}
                        active={category === item}
                    />
                )}
            />

            <Text style={styles.section}>Comidas populares</Text>

            <FlatList
                data={filteredFoods}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FoodCard item={item} navigation={navigation} />
                )}
            />
            <AIChatWidget />
        </Animated.View>
    );
}

const styles = StyleSheet.create({

    ///Mejorado: fondo oscuro para mejor contraste visual
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0f172a"
    },

    ///Mejorado: jerarquía visual (título más grande y claro)
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff"
    },

    ///Mejorado: input más visible y moderno
    search: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 15
    },

    ///Mejorado: mejor separación visual
    categories: {
        marginBottom: 15
    },

    ///Mejorado: subtítulo más claro y legible
    section: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        color: "#e2e8f0"
    }

});