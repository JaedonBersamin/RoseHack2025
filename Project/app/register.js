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