import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import Helsinki from './Helsinki';
import Tampere from './Tampere';
import Turku from './Turku';
import { API_URL } from '../../apiconfig';
import { useBooking } from '../../Context/BookingContext';

const Tab = createMaterialTopTabNavigator();

const AvailableShifts = () => {
  const [shiftCounts, setShiftCounts] = useState({ Helsinki: 0, Tampere: 0, Turku: 0 });

  const { bookedShifts, refreshOtherPages } = useBooking();
  const fetchShiftCounts = async () => {
    try {
      const response = await axios.get(`${API_URL}/shifts`);
      const data = response.data;

      const currentTime = Date.now();

      const helsinkiShifts = data.filter(shift => shift.area === 'Helsinki' && !shift.booked && new Date(shift.startTime).getTime() > currentTime).length;
      const tampereShifts = data.filter(shift => shift.area === 'Tampere' && !shift.booked && new Date(shift.startTime).getTime() > currentTime).length;
      const turkuShifts = data.filter(shift => shift.area === 'Turku' && !shift.booked && new Date(shift.startTime).getTime() > currentTime).length;

      setShiftCounts({ Helsinki: helsinkiShifts, Tampere: tampereShifts, Turku: turkuShifts });
    } catch (error) {
      console.error('Error fetching shift counts:', error);
    }
  };

  useEffect(() => {
    fetchShiftCounts();
  }, [bookedShifts]);

  return (
    <Tab.Navigator
      initialRouteName="Tampere"
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ fontSize: 15, color: focused ? 'black' : 'grey' }}>
              {`${route.name} (${shiftCounts[route.name]})`}
            </Text>
          );
        },
        tabBarPressColor: '#fff',
        tabBarActiveTintColor: 'black',
        tabBarShowIcon: false,
        backBehavior: 'history',
      })}
    >
      <Tab.Screen name="Helsinki" component={Helsinki} />
      <Tab.Screen name="Tampere" component={Tampere} />
      <Tab.Screen name="Turku" component={Turku} />
    </Tab.Navigator>
  );
};

export default AvailableShifts;
