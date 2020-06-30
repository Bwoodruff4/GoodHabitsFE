import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HabitsScreen from './HabitScreen'
import {
    Button,
    Icon,
} from 'native-base'

const HabitsStack = createStackNavigator();

const HabitsStackScreen = ({navigation}) => (
    <HabitsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#039BE5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerTitleAlign: 'center'
    }}>
        <HabitsStack.Screen name="Habits" component={HabitsScreen}
            options={{
                headerLeft: () => (
                    <Button transparent light>
                        <Icon name="menu" style={{color:'white'}}  onPress={() => navigation.toggleDrawer()}/>
                    </Button>
                )
            }}
        />
    </HabitsStack.Navigator>
)

export default HabitsStackScreen;