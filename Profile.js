import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Profile extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Profile
                </Text>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'lightgreen'
    }
})