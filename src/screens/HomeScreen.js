import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    useWindowDimensions
} from "react-native";

import { foods } from "../utils/foods";
import FoodCard from "../components/FoodCard";
import CategoryButton from "../components/CategoryButton";

export default function HomeScreen({ navigation }) {

    const { width } = useWindowDimensions();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Todo");

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
        <View style={styles.container}>

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

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f4f4f4"
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10
    },

    search: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15
    },

    categories: {
        marginBottom: 10
    },

    section: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10
    }

});