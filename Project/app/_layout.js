import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./home";
import Register from "./register";
import Login from "./login";
import Leaderboard from "./leaderboard";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navbar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#D3D3D3", // Set a background color for visibility
                    height: 80, // Fixed height for the tab bar
                },
                headerShown: false, // Hides header for the screens
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
        </Tab.Navigator>
    );
}

export default function Layout() {
    return (
        <TailwindProvider>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Home" component={Navbar} options={{ headerShown: false }}
                />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </TailwindProvider>
    );
}
