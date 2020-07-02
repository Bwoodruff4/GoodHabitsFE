import React, {useState} from 'react'
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
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

export default function HabitsScreen() {
    const [selectedValue, setSelectedValue] = useState(undefined)
    const [trackerSheet, setTrackerSheet] = useState([
        {day: 'Day 1', checked: true, id: '1'},
        {day: 'Day 2', checked: true, id: '2'},
        {day: 'Day 3', checked: true, id: '3'},
        {day: 'Day 4', checked: true, id: '4'},
        {day: 'Day 5', checked: false, id: '5'},
        {day: 'Day 6', checked: true, id: '6'},
        {day: 'Day 7', checked: true, id: '7'},
        {day: 'Day 8', checked: true, id: '8'},
        {day: 'Day 9', checked: true, id: '9'},
        {day: 'Day 10', checked: true, id: '10'},
        {day: 'Day 11', checked: true, id: '11'},
        {day: 'Day 12', checked: true, id: '12'},
        {day: 'Day 13', checked: true, id: '13'},
        {day: 'Day 14', checked: true, id: '14'},
        {day: 'Day 15', checked: true, id: '15'},
        {day: 'Day 16', checked: true, id: '16'},
        {day: 'Day 17', checked: true, id: '17'},
        {day: 'Day 18', checked: true, id: '18'},
        {day: 'Day 19', checked: true, id: '19'},
        {day: 'Day 20', checked: false, id: '20'},
        {day: 'Day 21', checked: false, id: '21'},
        {day: 'Day 22', checked: false, id: '22'},
        {day: 'Day 23', checked: true, id: '23'},
        {day: 'Day 24', checked: true, id: '24'},
        {day: 'Day 25', checked: true, id: '25'},
        {day: 'Day 26', checked: true, id: '26'},
        {day: 'Day 27', checked: true, id: '27'},
        {day: 'Day 28', checked: true, id: '28'},
        {day: 'Day 29', checked: false, id: '29'},
        {day: 'Day 30', checked: true, id: '30'},
    ])

    const handleDropDownChange = (value) => {
        setSelectedValue(value)
    }
    const handleCheckChange = (itemID) => {
        let newSheet = trackerSheet.map(item => {
            return item.id == itemID ? {...item, checked: !item.checked} :item
        })
        // newSheet[(itemID - 1)].checked = !(newSheet[(itemID - 1)].checked)
        setTrackerSheet(newSheet)
    }

    return (
        <Container style={styles.container}> 
            <Form>
                <Item picker>
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
                        <Picker.Item label="Commit to Github" value="key0" />
                        <Picker.Item label="Excercise" value="key1" />
                        <Picker.Item label="Read" value="key2" />
                        <Picker.Item label="Meditate" value="key3" />
                    </Picker>
                </Item>
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
                                    <CheckBox checked={item.checked} onPress={() => handleCheckChange(item.id)}/>
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