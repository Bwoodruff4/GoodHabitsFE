import React,{useState, useEffect} from 'react'
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

const loginURL = `http://10.0.2.2:3000/login`

export default function SignInScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (val) => {
        setUsername(val)
    }
    const handlePasswordChange = (val) => {
        setPassword(val)
    }

    const login = () => {
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
        .then(response => console.log(response))
    }
    return (
        
        <View style={styles.container}>
            <Form style={styles.loginContainer}>
                <Item>
                    <Icon active name="person" />
                    <Input placeholder="Username" onChangeText={(val) => handleUsernameChange(val)}/>
                </Item>
                <Item>
                    <Icon active name="lock" />
                    <Input secureTextEntry placeholder="Password" onChangeText={(val) => handlePasswordChange(val)}/>
                </Item>
                <Button block rounded style={styles.button} onPress={login}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Sign In</Text>
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
        height: 150,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        margin: 10
    }
})