import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyShift from '../MyShift/MyShift';
import AvailableShifts from '../AvailableShifts/AvailableShifts';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const UserNavigation = () => {
    const val= "MyShift";
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <View style={styles.headertab}>
            <Text style={styles.headertext}>Book<Text style={{color:'#004FB4'}}>My</Text>Shift</Text>
        </View>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
            size = 27
          if (route.name === "MyShift") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "AvailableShifts") {
            iconName = focused ? "clipboard-list" : "clipboard-list-outline";
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarActiveTintColor: '#004FB4',
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: "gray",
          paddingBottom: 8,
          height: 67,
        },
      })}>
      <Tab.Screen name="MyShift" component={MyShift} options={{ tabBarLabel: "My Shifts", headerShown: false }}/>
      <Tab.Screen name="AvailableShifts" component={AvailableShifts} options={{ tabBarLabel: "Available Shifts", headerShown: false }}/>
    </Tab.Navigator>
    </View>
  )
}

export default UserNavigation

const styles = StyleSheet.create({
    headertab:{
        flexDirection:'row',
        gap:5,
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderColor:'#D9D9D9'
    },
    headertext:{
        fontSize:18,
    }
})