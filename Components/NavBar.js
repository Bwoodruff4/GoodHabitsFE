import React from 'react'
import * as Font from 'expo-font';
import { StyleSheet, StatusBar } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
  } from "native-base";

export default function NavBar(props) {
    return (
        <Header style={styles.container}>
            <StatusBar backgroundColor={styles.container.backgroundColor}/>
            <Left>
                <Button transparent>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>
                    Good Habits
                </Title>
            </Body>
        </Header>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3F75B5',
    },
  });