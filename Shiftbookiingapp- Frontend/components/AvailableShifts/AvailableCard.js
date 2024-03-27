import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { API_URL } from '../../apiconfig';

const AvailableCard = ({ data, reloadData, refreshData }) => {
    const { id, startTime, endTime, booked, overlapping } = data || {};

    const [isbooked, setBooked] = useState(booked);
    const [isOverlapping, setOverlapping] = useState(overlapping);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [bookindicator, setBookindicator] = useState(false);

    const startDate = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const endDate = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    useEffect(() => {
        const currentTime = Date.now();
        const shiftStartTime = new Date(startTime).getTime();
        if (currentTime >= shiftStartTime) {
            setButtonDisabled(true); 
        } else {
            setButtonDisabled(false);
        }
    }, []);

    const handleBook = async () => {
        try {
            setBookindicator(true);
            const response = await fetch(`${API_URL}/shifts/${id}/book`);

            if (!response.ok) {
                const responseData = await response.json();
                const errorMessage = responseData.message || 'An error occurred';
                showToast(errorMessage);
                setBookindicator(false);
                return;
            }
            reloadData();
            refreshData();
            setBookindicator(false);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    }

    const handleCancel = async () => {
        try {
            setBookindicator(true);
            const response = await fetch(`${API_URL}/shifts/${id}/cancel`);

            if (!response.ok) {
                const responseData = await response.json();
                const errorMessage = responseData.message || 'An error occurred';
                showToast(errorMessage);
                setBookindicator(false);
                return;
            }
            reloadData(); 
            refreshData();
            setBookindicator(false);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    return (
        <View style={styles.card}>
            <View style={styles.carddetails}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Text style={styles.time}>{startDate} - {endDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={[styles.shiftstatus, { color: isButtonDisabled? 'grey' :overlapping ? '#E2006A' : 'grey' }]}>{isButtonDisabled ? "Shift Unavailable" : overlapping ? "Overlapping" : booked ? "Booked" : "Available"}</Text>
                </View>
            </View>
            <View style={styles.cardctc}>
                <TouchableOpacity
                    style={[
                        styles.cardbtn,
                        {
                            borderColor: isButtonDisabled || overlapping ? 'grey' : booked ? '#E2006A' : '#16A64D',
                            opacity: isButtonDisabled || overlapping ? 0.5 : 1
                        }
                    ]}
                    onPress={() => {
                        !isButtonDisabled && !overlapping && (booked ? handleCancel() : handleBook());
                    }}
                    disabled={isButtonDisabled || overlapping}
                >
                    {bookindicator ? <ActivityIndicator size={19} color={booked ? "#E2006A" : "#16A64D"} /> : overlapping || isButtonDisabled ? <Text style={{ color: 'grey' }}>Book</Text> : booked ? <Text style={{ color: '#E2006A' }}>Cancel</Text> : <Text style={{ color: '#16A64D' }}>Book</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AvailableCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 80,
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
    shiftstatus: {
        fontSize: 12,
    },
    time: {
        fontSize: 16,
    },
    cardctc: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardbtn: {
        width: 70,
        padding: 12,
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
});
