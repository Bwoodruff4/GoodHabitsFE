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
    Picker,
  } from "native-base";

const habitURL = `http://10.0.2.2:3000/habits`

export default function NewHabitScreen({route,navigation}) {
    const { userInfo } = route.params
    const [title, setTitle] = useState('')
    const [selectedValue, setSelectedValue] = useState(undefined)

    console.log(userInfo, "New Habit Screen")
    
    const handleDropDownChange = (value) => {
        setSelectedValue(value)
        console.log(value)
    }
    const handleTitleChange = (val) => {
        setTitle(val)
    }

    const handleSubmit = () => {
        fetch(habitURL, {
            method: "POST",
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

    return (
        <View style={styles.container}>
            <Form style={styles.loginContainer}>
                <Item>
                    <Input placeholder="Enter Habit Title" onChangeText={(val) => handleTitleChange(val)}/>
                </Item>
                <Item>
                    <Text>Number of Days:</Text>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select Number of Days"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={selectedValue}
                        onValueChange={(val) => handleDropDownChange(val)}
                    >
                        <Picker.Item label="15" value='15' />
                        <Picker.Item label="30" value='30' />
                        <Picker.Item label="60" value='60' />
                    </Picker>
                </Item>
                <Button block rounded style={styles.button} onPress={handleSubmit}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Create Habit</Text>
                </Button>
                <Button block rounded bordered style={styles.button} onPress={() => navigation.navigate('Profile')}>
                    <Text style={{fontWeight:'bold'}}>Cancel</Text>
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