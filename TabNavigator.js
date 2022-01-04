import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from "../Screens/Feed"
import CreatePost from '../Screens/CreatePost';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';



const Tab =createBottomTabNavigator();

const BottomTabNavigator=()=>{
    return(
        <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
                let iconName; 
                if(route.name==='Feed'){
                    iconName=focused
                    ?'book'
                    :'book-outline'
                }else if(route.name==='CreatePost'){
                    iconName=focused?'create':'create-outline';
                }
                return <Ionicons
                 name={iconName}
                  size={size}  
                  color={color}
                  style={styles.icon}
                  />
            },

        })}
        tabBarOptions={{
            activeTintColor:'tomato',
            inactiveTintColor:'gray'
        }}
        
        >
       <Tab.Screen name="Feed" component={Feed}/>
       <Tab.Screen name="CreatePost" component={CreatePost}/>


        </Tab.Navigator>
    )
}

const styles=StyleSheet.create({
   bottomTabStyle:{
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
   },
   icon:{
       width:RFValue(30),
       height:RFValue(30)
   }
})
export default BottomTabNavigator