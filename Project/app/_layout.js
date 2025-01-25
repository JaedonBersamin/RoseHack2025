import React from "react";
import { View, Text } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import TabNavigator from "../components/navbar";
import Header from "../components/header";
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import Home from "./home"
import Register from "./register";

const Stack = createStackNavigator();

export default function Layout() {
    return (
        <TailwindProvider>
            <NavigationIndependentTree>
                <NavigationContainer>
                    <View className="h-full w-full justify-end">
                        <Stack.Navigator initialRouteName="Register">
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Register" component={Register} />
                        </Stack.Navigator>
                    </View>
                </NavigationContainer>
            </NavigationIndependentTree>
        </TailwindProvider>
    );
}
