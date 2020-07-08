import React,{useState, useEffect, useContext} from 'react'
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

import { AuthContext } from '../Components/context'  

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    const handleUsernameChange = (val) => {
        setUsername(val)
    }
    const handlePasswordChange = (val) => {
        setPassword(val)
    }

    const login = () => {
        signIn(username, password)
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