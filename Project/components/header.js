import React from 'react';
import { Text, View } from 'react-native';
import {TailwindProvider} from "tailwindcss-react-native";

export default function Header({ title }) {
    return (
        <TailwindProvider>
            <View className="flex-1 items-center border-2 border-gray-500 py-3 rounded-b-lg">
                <Text className="text-xl font-bold text-gray-800">
                    {title}
                </Text>
            </View>
        </TailwindProvider>
    );
}
