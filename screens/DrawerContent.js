import React from 'react'
import {View, Text, StyleSheet } from "react-native"
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import {
    Button,
    Icon,
} from 'native-base'

export function DrawerContent(props) {
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
                    onPress={() => {props.navigation.navigate('Home')}}
                />
                <DrawerItem 
                    label="Profile"
                    onPress={() => {props.navigation.navigate('Profile')}}
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
                    onPress={() => {}}
                />
            </View>
            {/* <DrawerContentScrollView {...props}>
                <View>
                    <View>
                        <Text>Hello</Text>
                    </View>
                </View>
                <Drawer.Section>
                    <DrawerItem
                        label="Home"
                    />
                    <DrawerItem
                        label="Profile"
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section>
                <DrawerItem
                    label="Bottom"
                />
            </Drawer.Section> */}
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
