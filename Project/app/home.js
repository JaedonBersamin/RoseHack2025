import { Text, View, StyleSheet } from "react-native";
import {TailwindProvider} from "tailwindcss-react-native";
import Header from "../components/header";
import TabNavigator from "../components/navbar";


export default function Home() {
    return (
        <TailwindProvider>
            <View className="flex-1">
                <View className="flex-row items-center justify-center h-auto w-full bg-gray-200">
                    <Header title="Grade Weights" />
                </View>
                <View className="flex-row items-center justify-center h-auto w-full bg-gray-200">
                    <Header title="Grading Scale" />
                </View>

                <View className="flex-1">
                    {/*<TabNavigator />*/}
                </View>
            </View>
        </TailwindProvider>
    );
}
