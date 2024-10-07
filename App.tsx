import 'react-native-gesture-handler';
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
      <StackNavigator></StackNavigator>
    </PaperProvider>
    </NavigationContainer>
  )
}

export default App

