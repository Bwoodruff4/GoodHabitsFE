import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useReducer} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
import { UserContext } from './Components/userContext';


const Drawer = createDrawerNavigator();

const loginURL = `http://10.0.2.2:3000/login`

const userURL = `http://10.0.2.2:3000/users/1`


export default function App() {
  const [userInfo, setUserInfo] = useState({})
  
  const userValue = useMemo(() => ({userInfo, setUserInfo}), [userInfo, setUserInfo])

  const initialLoginState = {
    isLoading: true,
    userID: null,
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
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userID: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  const[loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(username, password) => {
      let userData = await fetch(loginURL, {
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
      }).then(response => response.json())
      setUserInfo(userData.user)
      let userToken = null
      if(userData.user != null && userData.user.username === username) {
        userToken = userData.jwt
        try {
          await AsyncStorage.setItem('userToken', userToken)
          // await AsyncStorage.setItem('userID', userData.user.id)
        } catch(error) {
          console.log(error)
        }
      }
      else {
        console.log(userData.message)
      }
      dispatch({type: 'LOGIN', id: userData.user.id, token: userToken })
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken')
        // await AsyncStorage.removeItem('userID')
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

  const getUserInfo = async() => {
      const response = await fetch(userURL)
      const data = await response.json()
      setUserInfo(data)
  }
  
  useEffect(() => { 
      getUserInfo()
  }, [])

  useEffect(() => {
    setTimeout(async() => {
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(error) {
        console.log(error)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken })
    },1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  return (
    <StyleProvider style={getTheme(material)}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <UserContext.Provider value={userValue}>
              <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>} >
                <Drawer.Screen name="Home" component={HomeStackScreen}/>
                <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
                <Drawer.Screen name="Habits" component={HabitsStackScreen}/>
                <Drawer.Screen name="NewHabitScreen" component={NewHabitScreen}/>
              </Drawer.Navigator> 
            </UserContext.Provider>
          )
          :
            <RootStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </StyleProvider> 
  );
}
