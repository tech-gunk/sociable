import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'

export default class LoadingScreen extends Component{

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged((user)=>{
           if(user){
               this.props.navigation.navigate("DashboardScreen")
           }
           else{
               this.props.navigation.navigate("LoginScreen")
           }
        })
    }
    
    render(){
        return(
            <View style={style.container}>
                <ActivityIndicator size="large"/>
               </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignSelf:'center'
    }
})