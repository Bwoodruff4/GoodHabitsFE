import React, {useState, useEffect} from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
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
    CheckBox
} from "native-base";

const habitURL = `http://10.0.2.2:3000/habits`
const userURL = `http://10.0.2.2:3000/users/1`


export default function HabitsScreen({route, navigation}) {
    const { userInfo } = route.params
    const habits = userInfo.habits

    const [habitList, setHabitList] = useState([])
    const [selectedValue, setSelectedValue] = useState({})
    const [trackerSheet, setTrackerSheet] = useState([])

    const handleDropDownChange = (habit) => {
        if (habit == null){
            return
        }
        // console.log(userInfo, "Habits Screen")
        setSelectedValue(habit)
        getTrackerSheet(habit)
    }

    const handleCheckChange = (itemID) => {
        let newSheet = trackerSheet.map(item => {
            return item.id == itemID ? {...item, checked: !item.checked} :item
        })
        // newSheet[(itemID - 1)].checked = !(newSheet[(itemID - 1)].checked)
        setTrackerSheet(newSheet)
    }

    const getTrackerSheet = (habit) => {
        fetch(habitURL + `/${habit.id}`)
        .then(response => response.json())
        .then(habit => {
            setTrackerSheet(habit.days)
        })      
    }

    useEffect(()=> {
        setHabitList(habits)
    }, [])

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
                                    <CheckBox checked={Boolean(item.checked)} onPress={() => handleCheckChange(item.id)}/>
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
        alignItems: 'center'
    },
    card: {
        marginHorizontal: 25,
    },
    item: {
        marginHorizontal: 5,
        // padding: 5,
        height: 65,
        width: 110,

    }
})