import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "./index"; // Import the home page

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
                headerShown: false, // Hide the header if not needed
            }}
        >
            <Tab.Screen name="Home" component={Index} />
        </Tab.Navigator>
    );
}