import React, {useState, useEffect} from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import {
    Content,
    Container,
    Form,
    Item,
    Input,
    Button,
    Text,
    Icon,
  } from "native-base";

const habitURL = `http://10.0.2.2:3000/habits`

export default function NewHabitScreen({navigation}) {
    const [title, setTitle] = useState('')
    const [dayCount, setDayCount] = useState(0)
    
    const handleEmailChange = (val) => {
        setEmail(val)
    }
    const handleUsernameChange = (val) => {
        setUsername(val)
    }
    const handlePasswordChange = (val) => {
        setPassword(val)
    }
    const handlePasswordConfirmedChange = (val) => {
        setPasswordConfirmed(val)
    }
    const handleSubmit = () => {
        fetch(userURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                    email: email
                }
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))

        navigation.navigate('SignInScreen')
    }

    return (
        <View style={styles.container}>
            <Form style={styles.loginContainer}>
                <Item>
                    <Icon active name="mail" />
                    <Input placeholder="Email" onChangeText={(val) => handleEmailChange(val)}/>
                </Item>
                <Item>
                    <Icon active name="person" />
                    <Input placeholder="Username" onChangeText={(val) => handleUsernameChange(val)}/>
                </Item>
                <Item>
                    <Icon active name="lock" />
                    <Input secureTextEntry placeholder="Password" onChangeText={(val) => handlePasswordChange(val)}/>
                </Item>
                <Item>
                    <Icon active name="lock" />
                    <Input secureTextEntry placeholder="Re-enter Password" onChangeText={(val) => handlePasswordConfirmedChange(val)}/>
                </Item>
                <Button block rounded style={styles.button} onPress={handleSubmit}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Sign Up</Text>
                </Button>
            </Form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    loginContainer: {
        height: 290,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        margin: 10
    }
})