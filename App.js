import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import {
  Container,
  StyleProvider,
} from "native-base";
import NavBar from './Components/NavBar'
import Home from './Screens/Home'
import Profile from './Screens/Profile'

export default function App() {

  // state = {
  //   isReady: false
  // }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     Roboto: require('native-base/Fonts/Roboto.ttf'),
  //     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //     ...Ionicons.font,
  //   });
  //   this.setState({ isReady: true });
  // }
  // if (!this.state.isReady) {
  //   return <AppLoading />;
  // }

  const Drawer = createDrawerNavigator()

  const toggleMenu = () => {
    navigation.toggleDrawer()
  }
  
  return (
    <StyleProvider style={getTheme(material)}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} toggleMenu={navigation.toggleDrawer()}/>
            <Drawer.Screen name="Profile" component={Profile} toggleMenu={navigation.toggleDrawer()}/>
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
