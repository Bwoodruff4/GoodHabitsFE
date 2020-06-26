import 'react-native-gesture-handler';
import React, {useState} from 'react';
// import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerContent } from './screens/DrawerContent'
import {
  StyleProvider,
} from "native-base";
import NavBar from './Components/NavBar'
import MainTabScreen from './screens/MainTabScreen'
import HomeStackScreen from './screens/HomeStackScreen'
import ProfileStackScreen from './screens/ProfileStackScreen'

// import { FontDisplay } from 'expo-font';

// const getFonts = () => FontDisplay.loadAsync({
//   'font-type': require('./location')
// })

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StyleProvider style={getTheme(material)}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={HomeStackScreen} gobalStyle={getTheme(material)}/>
            <Drawer.Screen name="Profile" component={ProfileStackScreen} gobalStyle={getTheme(material)}/>
          </Drawer.Navigator>
        </NavigationContainer>
    </StyleProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
