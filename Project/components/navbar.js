import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/home";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}