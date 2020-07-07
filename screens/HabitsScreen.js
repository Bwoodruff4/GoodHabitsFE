import React, {useState, useEffect} from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import {
    Button,
    Container,
    Text,
    Content,
    Form,
    Item,
    Picker,
    Icon,
    Card,
    CardItem,
    Right,
    Left,
    // CheckBox
} from "native-base"
import { CheckBox } from 'react-native-elements'

const habitURL = `http://10.0.2.2:3000/habits/`
const userURL = `http://10.0.2.2:3000/users/`
const dayURL = `http://10.0.2.2:3000/days/`


export default function HabitsScreen({route, navigation}) {
    const { userInfo } = route.params
    // console.log(userInfo, "Habits Screen")
    const [habitList, setHabitList] = useState(userInfo.habits)
    const [selectedValue, setSelectedValue] = useState({})
    const [trackerSheet, setTrackerSheet] = useState([])
    
    const getUserHabits = (url) => {
        fetch(url + `${userInfo.id}`)
        .then(response => response.json())
        .then(userHabits => setHabitList(userHabits.habits))
    }

    useEffect(()=> { 
        getUserHabits(userURL)
    }, [])

    const handleDropDownChange = (habit) => {
        if (habit == null){
            return
        }
        // getUserHabits(userURL)
        setSelectedValue(habit)
        getTrackerSheet(habit)
    }
    
    const handleCheckChange = (itemID) => {
        let newSheet = trackerSheet.map(item => {
            return item.id == itemID ? {...item, checked: !item.checked} :item
        })
        setTrackerSheet(newSheet)
        let dayToBeUpdated = trackerSheet.filter(day => day.id === itemID)
        dayToBeUpdated.checked = !dayToBeUpdated.checked
        dayToBeUpdated.checked = dayToBeUpdated.checked ? 1 : 0
        console.log(dayToBeUpdated)
        fetch(dayURL + `${itemID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                day: {
                    day: dayToBeUpdated.day,
                    checked: dayToBeUpdated.checked,
                    habit_id: dayToBeUpdated.habit_id
                }
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }

    const getTrackerSheet = (habit) => {
        setTrackerSheet([])
        fetch(habitURL + `${habit.id}`)
        .then(response => response.json())
        .then(habit => {
            setTrackerSheet(habit.days)
        })     
    }

    return (
        <Container style={styles.container}> 
            <Form>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your Habit"
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
            </Form>
            <Container style={styles.cardItems}>
                <FlatList 
                    numColumns={3}
                    keyExtractor={(item => item.id)}
                    data={trackerSheet}
                    renderItem={({item}) => (
                        <Card style={styles.card}>
                            <CardItem style={styles.item}> 
                                <Left>
                                    <CheckBox size={40} iconLeft center iconType="material" checkedIcon='clear' uncheckedIcon='add' checkedColor='red' checked={Boolean(item.checked)} onPress={() => handleCheckChange(item.id)}/>
                                </Left>
                                <Right>
                                    <Text style={{textAlign: 'center'}}>{item.day}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    )}
                />
            </Container>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    button: {
        margin: 10
    },
    cardItems: {
        alignItems: 'center',
    },
    card: {
        marginHorizontal: 5,
    },
    item: {
        marginHorizontal: 5,
        height: 65,
        width: 105,
    }
})