import React from 'react'
import { StyleSheet, Container, Text, View, Button } from 'react-native';
import NavBar from '../Components/NavBar'

export default function Home({navigation}) {
    return (
        <Container>
            <NavBar toggleMenu={navigation.toggleDrawer()}/>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home</Text>
            </View>
        </Container>
    )
}
