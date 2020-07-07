import React, {useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native';
import NavBar from '../Components/NavBar'
import { 
    Container, 
    Header, 
    Content, 
    H1,  
    H2, 
    H3, 
    Card,
    CardItem,
    Text } from 'native-base';

    const userURL = `http://10.0.2.2:3000/users/1`

export default function HomeScreen({route, navigation}) {
    // const { userInfo } = route.params
    const [userInfo, setUserInfo] = useState({})
    console.log(route.params, "Home Screen")

    useEffect(() => { 
        const fetchData = async () => {
         const data = await fetch(userURL)
          .then(response => response.json())
         setUserInfo(data)
        }
        fetchData()
    }, [])

    return (
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 30 }}>
            <Card>
                <Text style={{fontSize:35, fontWeight: 'bold', textAlign:'center', padding: 30}}>Welcome to Good Habits, {userInfo.username}</Text>
                <Text style={{fontSize:30, fontStyle: 'italic', textAlign:'center', padding: 30}}>You are currently tracking {userInfo.habits.length} habits.</Text>
            </Card>
        </Container>
    )
}
