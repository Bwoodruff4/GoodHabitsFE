import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// const MainTabScreen = () => (
    
// )

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
    </HomeStack.Navigator>
)
  
const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
    </ProfileStack.Navigator>
)

// export default MainTabScreen;