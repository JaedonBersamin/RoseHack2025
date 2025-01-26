import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Image
} from 'react-native';

export default function Register({ navigation }) {
    // Animation value for fade-in
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        });
        animation.start();
        return () => animation.stop(); // Cleanup animation
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            {/* Fade-in contents */}
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
                {/* Logo Image */}
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')} // Path to your logo image
                />

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'System', color: 'green', outline: 100 }}>Fresh</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'System', color: 'brown', marginLeft: 10 }}>Step</Text>
                </View>

                {/* Register Form */}
                <Text style={styles.header}>Register</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                />
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    placeholderTextColor="#888"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"s
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.loginButton, { marginTop: 15 }]}
                    onPress={() => console.log('Create button pressed')}
                >
                    <Text style={styles.loginButtonText}>Create</Text>
                </TouchableOpacity>

                {/* Move the "Back to Login" button here */}
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.bottomButtonText}>Back to Login</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6', // cream color
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    innerContainer: {
        width: '80%',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: -50, // Reduce the bottom margin to bring the logo closer to the title
    },
    header: {
        fontFamily: 'Verdana',
        fontSize: 24,
        marginBottom: 45,
    },
    label: {
        fontFamily: 'Verdana',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 4,
    },
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
    loginButton: {
        backgroundColor: 'darkgreen',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: 'Verdana',
        fontSize: 16,
    },
    bottomButton: {
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginTop: 16, // Add spacing between the two buttons
    },
    bottomButtonText: {
        color: 'darkgreen',
        fontFamily: 'Verdana',
        fontSize: 16,
    },
});
