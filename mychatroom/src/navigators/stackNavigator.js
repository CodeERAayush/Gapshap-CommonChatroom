import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from '@screens'
const StackNavigator = () => {

    const Stack=createStackNavigator()

    const _addScreen=(name)=> {
        return (
            <Stack.Screen
                name={name}
                component={Screen[name]}
                options={{headerShown:false}}
            />)
    }
    return (
            <Stack.Navigator>
                {_addScreen('MainScreen')}
                {_addScreen('ChatRoom')}
                {_addScreen('CreateRoom')}
                {_addScreen('JoinRoom')}
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default StackNavigator;
