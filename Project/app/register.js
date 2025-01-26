import { Text, View} from "react-native";
import {TailwindProvider} from "tailwindcss-react-native";

export default function Register() {
    return(
        <TailwindProvider>
            <View className="h-full w-full justify-end">
                <View> Register</View>
                <Text>sdfsdfsdf</Text>
            </View>
        </TailwindProvider>
    );
}