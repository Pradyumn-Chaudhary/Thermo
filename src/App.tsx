import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './screen/Home';
import BPM from './screen/BPM';
import Temperature from './screen/Temperature';
import Breath from './screen/Breath';

export default function App() {
  type RootStackParamList = {
    Home: undefined;
    BPM: undefined;
    Breath: { heartRate: number };
    Temperature: { heartRate: number; breathCount: number };
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const StackNavigator = (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BPM" component={BPM} />
      <Stack.Screen name="Breath" component={Breath} />
      <Stack.Screen name="Temperature" component={Temperature} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BPM" component={BPM} />
        <Stack.Screen name="Breath" component={Breath} />
        <Stack.Screen name="Temperature" component={Temperature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
