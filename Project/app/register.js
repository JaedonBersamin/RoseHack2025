import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/button';

export default function Register({ navigation }) {
    return (
        <View style={styles.container}>
            <CustomButton
                title="Go Back to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});