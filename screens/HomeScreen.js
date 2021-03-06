import React, {useState, useEffect, useContext } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { UserContext } from '../Components/userContext'
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

export default function HomeScreen({route, navigation, userID}) {
    const { userInfo } = useContext(UserContext)
    // const { userID } = route.params
    // const [userInfo, setUserInfo] = useState({})
    const [userHabits, setUserHabits] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    console.log(userInfo, "homescreen")

    // useEffect(() => { 
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     },1000)
    //     fetch(userURL)
    //     .then(response => response.json())
    //     .then(userInfo => {
    //         // setUserInfo(userInfo)
    //         setUserHabits(userInfo.habits)
    //     })
    // }, [])

    // if (isLoading) {
    //     return(
    //       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
    //         <ActivityIndicator size="large"/>
    //       </View>
    //     )
    //   }

    return (
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 30 }}>
            <Card>
                <Text style={{fontSize:35, fontWeight: 'bold', textAlign:'center', padding: 30}}>Welcome to Good Habits, {userInfo.username}</Text>
                <Text style={{fontSize:30, fontStyle: 'italic', textAlign:'center', padding: 30}}>You are currently tracking {userInfo.habits.length} habits.</Text>
            </Card>
        </Container>
    )
}
