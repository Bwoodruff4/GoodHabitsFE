import React from 'react'
import { StyleSheet, View } from 'react-native';
import {
    Button,
    Container,
    Text,
    Icon,
} from "native-base";

export default function ProfileScreen({route, navigation}) {
    const { userInfo } = route.params
    console.log(userInfo, "Profile Screen")
    return (
        <View style={styles.container}>
            <Button block info rounded style={styles.button} onPress={() => navigation.navigate('NewHabitScreen',{userInfo: userInfo})}>
                <Icon right name='add' />
                <Text>Add New Habit</Text>
            </Button>
            <Button block info rounded style={styles.button}>
                <Icon left name='trash' />
                <Text>Delete Habit</Text>
            </Button>
            <Button block info rounded style={styles.button}>
                <Icon left name='create' />
                <Text>Edit Profile</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    button: {
        margin: 5,
        justifyContent: 'center',
    }
})