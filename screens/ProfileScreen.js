import React from 'react'
import { StyleSheet, View } from 'react-native';
import {
    Button,
    Container,
    Text,
} from "native-base";

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button style={styles.button}>
                <Text>Add New Habit</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    loginContainer: {
        height: 150,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        margin: 10
    }
})