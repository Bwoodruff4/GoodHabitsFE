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

const userURL = `http://10.0.2.2:3000/users/`

export function DrawerContent(props) {

    const { userID } = props

    const { signOut } = useContext(AuthContext)
    console.log(userID, "Drawer")
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
                    onPress={() => {props.navigation.navigate('Home', {screen: "Home", params: {userID: userID}})}}
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
