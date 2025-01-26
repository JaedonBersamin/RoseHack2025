import React, {useRef, useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8082/api/users', {
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
                    level: 1
                }),
            });

            const data = await response.json();
            if (!response.ok) {
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
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
                <Text style={styles.header}>Register</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 550,
    },
    innerContainer: {
        width: '80%',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'Verdana',
        fontSize: 24,
        marginBottom: 16,
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
    button: {
        backgroundColor: 'darkgreen',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Verdana',
        fontSize: 16,
    },
});