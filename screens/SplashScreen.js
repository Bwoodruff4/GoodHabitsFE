import React from 'react'
import { 
    StyleSheet, 
    View,
    Image,
} from 'react-native';
import {
    Button,
    Container,
    Text,
  } from "native-base";

export default function SplashScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Xlogo.png')}/>  
            <View style={styles.buttonContainer}>
                <Button block rounded style={styles.button} onPress={() => {navigation.navigate('SignInScreen')}}>
                    <Text style={{fontWeight:'bold'}}>Sign In</Text>
                </Button>
                <Button block rounded bordered style={styles.button} onPress={() => {navigation.navigate('SignUpScreen')}}>
                    <Text style={{color:'#039BE5', fontWeight:'bold'}}>Sign Up</Text>
                </Button>  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        height: 200,
        width: 200,
    },
    buttonContainer: {
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        // backgroundColor: '#13248E',
        width: 300,
        alignItems: 'center',
    }
})
