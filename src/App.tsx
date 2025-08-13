import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './screen/Home';
import BPM from './screen/BPM';
import Temperature from './screen/Temperature';

export default function App() {
  const Stack = createNativeStackNavigator();
  const StackNavigator = (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BPM" component={BPM} />
      <Stack.Screen name="Temperature" component={Temperature} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BPM" component={BPM} />
        <Stack.Screen name="Temperature" component={Temperature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
