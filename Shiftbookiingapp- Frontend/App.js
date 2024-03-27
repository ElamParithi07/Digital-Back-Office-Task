import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserNavigation from './components/UserNavigation/UserNavigation';
import MyShift from './components/MyShift/MyShift';
import AvailableShifts from './components/AvailableShifts/AvailableShifts';
import AvailableCard from './components/AvailableShifts/AvailableCard';
import Helsinki from './components/AvailableShifts/Helsinki';
import Tampere from './components/AvailableShifts/Tampere';
import Turku from './components/AvailableShifts/Turku';
import MyShiftCard from './components/MyShift/MyShiftCard';
import { BookingProvider } from './Context/BookingContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <BookingProvider>
      <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='UserNavigation' component={UserNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='MyShift' component={MyShift} options={{ headerShown: false }} />
            <Stack.Screen name='AvailableShifts' component={AvailableShifts} options={{ headerShown: false }} />
            <Stack.Screen name='AvailableCard' component={AvailableCard} options={{ headerShown: false }} />
            <Stack.Screen name='Helsinki' component={Helsinki} options={{ headerShown: false }} />
            <Stack.Screen name='Turku' component={Turku} options={{ headerShown: false }} />
            <Stack.Screen name='Tampere' component={Tampere} options={{ headerShown: false }} />
            <Stack.Screen name='MyShiftCard' component={MyShiftCard} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </BookingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
