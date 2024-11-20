import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Mapa from './map';
import Home from './home';


export default function RootLayout() {
  return (
      <Stack.Navigator 
      screenOptions={{
          headerShown: false,
        }} 
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="map" component={Mapa} />
        

      </Stack.Navigator>
  );
}