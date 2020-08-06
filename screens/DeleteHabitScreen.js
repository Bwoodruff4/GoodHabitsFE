import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { UserContext } from '../Components/userContext'
import {
    Content,
    Container,
    Form,
    Item,
    Input,
    Button,
    Text,
    Icon,
    Picker,
  } from "native-base";

const habitURL = `http://10.0.2.2:3000/habits`
const userURL = `http://10.0.2.2:3000/users/`

export default function NewHabitScreen({navigation}) {
    const { userInfo } = useContext(UserContext)
    const [habitList, setHabitList] = useState(userInfo.habits)
    const [selectedValue, setSelectedValue] = useState({})
    
    const handleDropDownChange = (value) => {
        setSelectedValue(value)
    }

    const handleSubmit = () => {
        fetch(habitURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                habit: {
                    user_id: userInfo.id,
                    title: title,
                    day_count: parseInt(selectedValue)
                }
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
        navigation.navigate('Profile')
    }
    const updateUserHabits = () => {
        fetch(userURL + `${userInfo.id}`)
        .then(response => response.json()) 
        .then(userHabits => setHabitList(userHabits.habits))
    }

    return (
        <Container style={styles.container}> 
        <Form style={{flexDirection: 'row'}}>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                // placeholder="Select your Habit"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selectedValue}
                onValueChange={(val) => handleDropDownChange(val)}
            >
                <Picker.Item label="Select your Habit:" />
                {
                    habitList.map(habit => <Picker.Item label={habit.title} value={habit} key={habit.id} />)
                }   
            </Picker>
            <Button transparent onPress={updateUserHabits}>
                <Icon name='refresh'/>
            </Button>
        </Form>
        <Container>
            <Button block rounded style={styles.button} onPress={handleSubmit}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Delete Habit</Text>
            </Button>
        </Container>
    </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 50
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