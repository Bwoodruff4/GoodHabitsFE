import React from 'react'
import { StyleSheet, Container, Text, View } from 'react-native';
import NavBar from '../Components/NavBar'

export default function Profile({navigation}) {
    return (
        <View>
            <NavBar toggleMenu={navigation.toggleDrawer()}/>
            <Text>Profile</Text>
        </View>
    )
}