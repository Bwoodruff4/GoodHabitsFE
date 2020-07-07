import React, { useContext, useEffect } from 'react'
import {View, Text, StyleSheet } from "react-native"
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import {
    Button,
    Icon,
} from 'native-base'
import { AuthContext } from '../Components/context'

export function DrawerContent(props) {

    const { userInfo } = props

    const { getUserInfo } = props

    const { signOut } = useContext(AuthContext)

    const updateUserInfo = () => { 

    }

    const handleHabitsPress = () => {
        props.navigation.navigate('Habits', {screen: "Habits", params: {userInfo: userInfo}})
    }

    
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        name="home" 
                        />
                    )}
                    label="Home"
                    onPress={() => {props.navigation.navigate('Home', {screen: "Home", params: {userInfo: userInfo}})}}
                />
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        name="person" 
                        />
                    )}
                    label="Profile"
                    onPress={() => {props.navigation.navigate('Profile', {screen: "Profile", params: {userInfo: userInfo}})}}
                >
                </DrawerItem>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        name="journal" 
                        />
                    )}
                    label="Habits"
                    onPress={() => {props.navigation.navigate('Habits', {screen: "Habits", params: {userInfo: userInfo}})}}
                >
                </DrawerItem>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                            name="log-out" 
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
  });
