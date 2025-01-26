// import React from 'react';
// import { Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { TailwindProvider } from 'tailwindcss-react-native';
//
// export default function Register() {
//     return (
//         <TailwindProvider>
//             {/* Use flex-1 to fill the screen */}
//             <View className="flex-1 bg-gray-100 justify-center items-center px-4">
//
//                 {/* Big title at the top */}
//                 <Text className="display: 'flex', justifyContent: 'center', alignItems">Register</Text>
//
//                 {/* Stack of inputs and button */}
//                 <View className="w-full space-y-4">
//                     <TextInput
//                         className="bg-white rounded-md px-4 py-2 border border-gray-300"
//                         placeholder="Username"
//                     />
//                     <TextInput
//                         className="bg-white rounded-md px-4 py-2 border border-gray-300"
//                         placeholder="Password"
//                         secureTextEntry
//                     />
//                     <TouchableOpacity className="bg-green-800 rounded-md py-3">
//                         <Text className="text-center text-white font-semibold text-lg">
//                             Register
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//
//             </View>
//         </TailwindProvider>
//     );
// }

// import React from 'react';
//
// // Inline keyframes for fade-in
// const fadeInKeyframes = `
//   @keyframes fadeIn {
//     0% { opacity: 0; }
//     100% { opacity: 1; }
//   }
// `;
//
// const MyComponent = () => {
//     return (
//         <>
//             {/* Define the keyframes */}
//             <style>
//                 {fadeInKeyframes}
//             </style>
//
//             {/* Main container (fills page, cream background, fade-in) */}
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: '100vh',
//                     backgroundColor: '#f5f5dc',          // cream color
//                     animation: 'fadeIn 1s ease-in-out',
//                     fontFamily: 'Verdana',               // Verdana font for everything
//                 }}
//             >
//                 <div style={{ textAlign: 'center' }}>
//                     <h1>Register</h1>
//
//                     <p>Username</p>
//                     <input
//                         type="text"
//                         placeholder="Enter your username"
//                         style={{
//                             borderRadius: '9999px',           // very round (pill-shaped)
//                             padding: '8px 12px',
//                             marginBottom: '1rem',
//                             border: '1px solid #ccc',
//                         }}
//                     />
//
//                     <p>Password</p>
//                     <input
//                         type="password"
//                         placeholder="Enter your password"
//                         style={{
//                             borderRadius: '9999px',           // very round (pill-shaped)
//                             padding: '8px 12px',
//                             marginBottom: '1.5rem',
//                             border: '1px solid #ccc',
//                         }}
//                     />
//
//                     <button
//                         style={{
//                             backgroundColor: 'darkgreen',
//                             color: '#fff',
//                             padding: '0.5rem 1rem',
//                             border: 'none',
//                             borderRadius: '9999px',           // pill-shaped button
//                             cursor: 'pointer',
//                         }}
//                     >
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default MyComponent;

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';

export default function Register() {
    // Animation value
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Start the fade-in animation on mount
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            {/* Wrap content in an Animated.View to fade it in */}
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
                <Text style={styles.header}>Register</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Main container fills screen with cream background,
    // centered horizontally & vertically
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc', // cream color
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Center content, optionally fix the width
    innerContainer: {
        width: '80%',
        alignItems: 'center',
    },
    // Large heading
    header: {
        fontFamily: 'Verdana',
        fontSize: 24,
        marginBottom: 16,
    },
    // Label style
    label: {
        fontFamily: 'Verdana',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 4,
    },
    // Pill-shaped text input
    input: {
        width: '80%',
        borderRadius: 9999,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        fontFamily: 'Verdana',
    },
    // Pill-shaped button container
    button: {
        backgroundColor: 'darkgreen',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    // Button text
    buttonText: {
        color: '#fff',
        fontFamily: 'Verdana',
        fontSize: 16,
    },
});