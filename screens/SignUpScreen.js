import React from 'react'
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

export default function SplashScreen() {
    return (
        
        <View style={styles.container}>
            <Form style={styles.loginContainer}>
                <Item>
                    <Icon active name="mail" />
                    <Input placeholder="Email" />
                </Item>
                <Item>
                    <Icon active name="person" />
                    <Input placeholder="Username" />
                </Item>
                <Item>
                    <Icon active name="lock" />
                    <Input secureTextEntry placeholder="Password" />
                </Item>
                <Item>
                    <Icon active name="lock" />
                    <Input secureTextEntry placeholder="Re-enter Password" />
                </Item>
                <Button block rounded style={styles.button} onPress={() => {navigation.navigate('SignInScreen')}}>
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