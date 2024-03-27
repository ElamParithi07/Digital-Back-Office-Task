import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AvailableCard from './AvailableCard';
import { useBooking } from '../../Context/BookingContext';
import { API_URL } from '../../apiconfig';


const Tampere = () => {
  const [shiftsByDate, setShiftsByDate] = useState({});
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

        const shiftsGroupedByDate = {};
        data.forEach(shift => {
          const date = new Date(shift.startTime);
          const dateString = date.toDateString();
          if (!shiftsGroupedByDate[dateString]) {
            shiftsGroupedByDate[dateString] = [];
          }
         
            shiftsGroupedByDate[dateString].push(shift);
          
        });
  
     
        Object.keys(shiftsGroupedByDate).forEach(dateString => {
          shiftsGroupedByDate[dateString].forEach(shift => {
            const overlapping = checkForOverlapping(shift, shiftsGroupedByDate[dateString]);
            if(!shift.booked){
            shift.overlapping = overlapping;
            }
          });
        });

        const tampereShiftsGroupedByDate = {};
        Object.keys(shiftsGroupedByDate).forEach(dateString => {
          const tampereShifts = shiftsGroupedByDate[dateString].filter(shift => shift.area === 'Tampere');
          if (tampereShifts.length > 0) {
            tampereShiftsGroupedByDate[dateString] = tampereShifts;
          }
        });

        setShiftsByDate(tampereShiftsGroupedByDate);
       
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        setError(error);
        setLoading(false);
      });
  }, [reload,bookedShifts]);

  const refreshData = () => {
    setReload(prevReload => !prevReload);
    refreshOtherPages(); 
  };
  
  const checkForOverlapping = (newShift, shifts) => {
    for (const shift of shifts) {
      if (
        shift.booked && 
        newShift.startTime < shift.endTime &&
        newShift.endTime > shift.startTime
      ) {
        return true;
      }
    }
    return false;
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

  const reloadData = () => {
    setReload(reload => !reload);
  };

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={"blue"} size={35} /></View>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={Object.keys(shiftsByDate)}
        renderItem={({ item }) => {
          if (shiftsByDate[item].length === 0) {
            return null;
          }
          return (
            <View>
              <Text style={styles.header}>{formatDateString(item)}</Text>
              <FlatList
                data={shiftsByDate[item]}
                renderItem={({ item }) => <AvailableCard data={item} reloadData={reloadData} refreshData={refreshData} />}
                keyExtractor={shift => shift.id}
                style={{ padding: 20, }}
              />
            </View>
          );
        }}
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
  header: {
    fontSize: 15,
    width: '100%',
    color: 'grey',
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default Tampere;
