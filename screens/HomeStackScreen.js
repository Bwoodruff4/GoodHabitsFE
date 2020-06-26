import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import {
    Button,
    Icon,
} from 'native-base'

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#039BE5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerTitleAlign: 'center'
    }}>
      <HomeStack.Screen name="Good Habits" component={HomeScreen}
        options={{
            headerLeft: () => (
                <Button transparent light>
                    <Icon name="menu" style={{color:'white'}} onPress={() => navigation.toggleDrawer()}/>
                </Button>
            )
        }}
      />
    </HomeStack.Navigator>
)

export default HomeStackScreen;