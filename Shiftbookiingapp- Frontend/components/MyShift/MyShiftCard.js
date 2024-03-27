import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { API_URL } from '../../apiconfig';

const MyShiftCard = ({ data, reloadData, refreshData, isShiftStarted }) => {
    const { id, startTime, endTime, area, booked } = data || {};
    const [cancelindicator, setCancelIndicator] = useState(false);

    const startDate = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const endDate = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const handleCancel = async () => {
        try {
            setCancelIndicator(true);
            const response = await fetch(`${API_URL}/shifts/${id}/cancel`);

            if (!response.ok) {
                const responseData = await response.json();
                const errorMessage = responseData.message || 'An error occurred';
                showToast(errorMessage);
                setCancelIndicator(false);
                return;
            }
            reloadData();
            refreshData();
            setCancelIndicator(false);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    return (
        <View>
            <View style={styles.card}>
                <View style={styles.carddetails}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={styles.area}>{area}</Text>
                        {isShiftStarted && <Text style={styles.shiftstatus}>Already Started</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Feather name="calendar" size={13} color="grey" />
                        <Text style={styles.time}>{startDate} - {endDate}</Text>
                    </View>
                </View>
                <View style={styles.cardctc}>
                    <TouchableOpacity
                        style={styles.cancelbtn}
                        onPress={() => handleCancel()}
                        disabled={isShiftStarted}
                    >
                        {cancelindicator ? <ActivityIndicator size={19} color={"#E2006A"} /> : <Text style={styles.cancelbtntext}>Cancel</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MyShiftCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 75,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        marginVertical: 10,
        elevation: 1,
        backgroundColor: 'white',
        paddingHorizontal: 8,
    },
    carddetails: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 8,
    },
    area: {
        fontSize: 20,
    },
    shiftstatus: {
        color: 'grey',
        fontSize: 12,
    },
    time: {
        fontSize: 13,
        color: 'grey'
    },
    cardctc: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelbtn: {
        width: 70,
        padding: 12,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#E2006A',
        backgroundColor: 'white'
    },
    cancelbtntext: {
        color: '#E2006A'
    }
});
