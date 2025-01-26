import React from "react";
import { View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import Register from "./register";
import Login from "./login";


const Stack = createStackNavigator();

export default function Layout() {
    return (
        <TailwindProvider>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login}/>
            </Stack.Navigator>
        </TailwindProvider>
    );
}
