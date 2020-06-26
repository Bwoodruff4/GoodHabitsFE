import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen'
import {
    Button,
    Icon,
} from 'native-base'

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#039BE5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerTitleAlign: 'center'
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen}
            options={{
                headerLeft: () => (
                    <Button transparent light>
                        <Icon name="menu" style={{color:'white'}}  onPress={() => navigation.toggleDrawer()}/>
                    </Button>
                )
            }}
        />
    </ProfileStack.Navigator>
)

export default ProfileStackScreen;