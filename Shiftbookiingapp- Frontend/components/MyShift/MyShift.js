import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MyShiftCard from './MyShiftCard';
import { FontAwesome6 } from '@expo/vector-icons';
import { useBooking } from '../../Context/BookingContext';
import { API_URL } from '../../apiconfig';

const MyShift = () => {
  const [MybookedShifts, setMybookedShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const { bookedShifts, refreshOtherPages } = useBooking();

  useEffect(() => {
    fetch(`${API_URL}/shifts`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const MybookedShiftsData = data.filter(shift => shift.booked);
        setMybookedShifts(MybookedShiftsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        setError(error);
        setLoading(false);
      });
  }, [reload, bookedShifts]);


  const refreshData = () => {
    setReload(prevReload => !prevReload);
    refreshOtherPages(); 
  };

  const groupShiftsByDate = () => {
    const groupedShifts = {};
    MybookedShifts.forEach(shift => {
      const date = new Date(shift.startTime).toDateString();
      if (!groupedShifts[date]) {
        groupedShifts[date] = [];
      }
      groupedShifts[date].push(shift);
    });
    return groupedShifts;
  };

  const formatDateString = dateString => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date = new Date(dateString);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toDateString();
    }
  };

  const calculateShiftHours = shifts => {
    let totalHours = 0;
    shifts.forEach(shift => {
      const startTime = new Date(shift.startTime);
      const endTime = new Date(shift.endTime);
      const shiftHours = (endTime - startTime) / (1000 * 60 * 60); 
      totalHours += shiftHours;
    });
    return totalHours;
  };

  const isShiftStarted = startTime => {
    return new Date(startTime) <= new Date();
  };

  const reloadData = () => {
    setReload(prevReload => !prevReload);
  };

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={"blue"} size={35} /></View>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const groupedShifts = groupShiftsByDate();

  if (Object.keys(groupedShifts).length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', gap: 10 }}>
        <FontAwesome6 name="bookmark" size={24} color="grey" />
        <Text style={{ fontSize: 16, color: 'grey' }}>No shifts Booked</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 20 }}
        data={Object.keys(groupedShifts)}
        renderItem={({ item }) => (
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDateString(item)}</Text>
              <Text style={styles.shiftInfo}>
                {`${groupedShifts[item].length} shifts, ${calculateShiftHours(groupedShifts[item]).toFixed(2)} hours`}
              </Text>
            </View>
            {groupedShifts[item].map(shift => (
              <MyShiftCard
                key={shift.id}
                data={shift}
                reloadData={reloadData}
                refreshData={refreshData}
                isShiftStarted={isShiftStarted(shift.startTime)}
              />
            ))}
          </View>
        )}
        keyExtractor={dateString => dateString}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 15,
    color: 'black',
    marginVertical: 10,
  },
  shiftInfo: {
    fontSize: 13,
    color: 'grey',
  },
});

export default MyShift;
