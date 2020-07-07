import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useReducer} from 'react';
// import { AppLoading } from 'expo';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
import RootStackScreen from './screens/RootStackScreen'
import HabitsStackScreen from './screens/HabitsStackScreen'
import NewHabitScreen from './screens/NewHabitScreen'
import { AuthContext } from './Components/context'
import { isLoading } from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';


const Drawer = createDrawerNavigator();

const loginURL = `http://10.0.2.2:3000/login`

const userURL = `http://10.0.2.2:3000/users/10`

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  // const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  const[loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(username, password) => {
      // setUserToken('token')
      // setIsLoading(false)
      fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: username,
                password: password,
            }
        })
      })
      .then(response => response.json())
      // .then(userData => console.log(userData)) 

      let userToken
      userToken = null
      if( username == 'Blake' && password == 'Blake') {
        userToken = 'token'
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch(error) {
          console.log(error)
        }
      }
      dispatch({type: 'LOGIN', id: username, token: userToken })
    },
    signOut: async() => {
      // setUserToken(null)
      // setIsLoading(false)
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(error) {
        console.log(error)
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: () => {
      // setUserToken('token')
      // setIsLoading(false)
    }
  }))

  const getUserInfo = () => {
    // const fetchData = async () => {
    //   const data = await fetch(userURL)
    //    .then(response => response.json())
    //   setUserInfo(data)
    //   setIsLoading(false)
    //  }
    //  fetchData()
    fetch(userURL)
    .then(response => response.json())
    .then(userInfo => setUserInfo(userInfo))
  }

  // useEffect(() => { 
  //     getUserInfo()
  // }, [])

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false)
      getUserInfo()
      let userToken
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(error) {
        console.log(error)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken })
      
    },1000)
  }, [])

  if (loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  // console.log(userInfo,"App Page")
  return (
    <StyleProvider style={getTheme(material)}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} userInfo={userInfo} getUserInfo={getUserInfo}/>} >
              <Drawer.Screen name="Home" component={HomeStackScreen} gobalStyle={getTheme(material)}/>
              <Drawer.Screen name="Profile" component={ProfileStackScreen} gobalStyle={getTheme(material)}/>
              <Drawer.Screen name="Habits" component={HabitsStackScreen} gobalStyle={getTheme(material)}/>
              <Drawer.Screen name="NewHabitScreen" component={NewHabitScreen} gobalStyle={getTheme(material)}/>
            </Drawer.Navigator> 
          )
          :
            <RootStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
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
