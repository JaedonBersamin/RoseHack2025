import React, {useRef, useEffect, useState} from 'react';
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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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


    const handleRegister = async () => {
        if (!email || !password || !username) {
            alert("Please enter a valid email and password");
        }

        try {
            let usersResponse = await fetch('http://localhost:8082/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let users = await usersResponse.json();

            for (const user of users) {
                console.log("email", user.email, "username", user.username);
                if (user.email === email || user.username === username) {
                    alert("Email or username taken");
                    return;
                }
            }

            let createResponse = await fetch('http://localhost:8082/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    streak: 1,
                    tasks: [],
                    level: 1,
                    xp_points: 0
                }),
            });

            const data = await createResponse.json();
            if (!createResponse.ok) {
                console.error('Error creating user:', data.error);
                return;
            }

            console.log('User created:', data);
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    }

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
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    onChangeText={setUsername}
                    placeholderTextColor="#888"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={[styles.loginButton, { marginTop: 15 }]}
                    onPress={() => {
                        console.log('Create button pressed');
                        handleRegister();

                        if (email && password) {
                          navigation.navigate('Home')}
                    }}
                >
                    <Text style={styles.loginButtonText}>Register</Text>
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