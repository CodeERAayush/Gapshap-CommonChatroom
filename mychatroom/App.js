import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigators/stackNavigator'

const App = () => {
  return (
  <NavigationContainer>
    <StackNavigator/>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})