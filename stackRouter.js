import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LandingScreen from './screens/LandingScreen'
import App from './App'

const Stack = createNativeStackNavigator()

function stackRouter(){
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Landing'
        screenOptions={{headerShown: false}} //탭메뉴 헤더와 겹치지 않도록 함
      >
        <Stack.Screen name='Landing' component={LandingScreen}/>
        <Stack.Screen name='App' component={App}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default stackRouter