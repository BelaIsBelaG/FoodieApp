import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import AuthScreen from "../screens/AuthScreen"

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (

        <NavigationContainer>

            <Stack.Navigator>

                <Stack.Screen
                name ="AuthScreen"
                component={AuthScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                />

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    )
}