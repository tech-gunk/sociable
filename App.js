import * as React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from './Screens/LoginScreen'
import LoadingScreen from './Screens/LoadingScreen'
import DashboardScreen from './Screens/DashboardScreen'
 import * as firebase from 'firebase'
 import { firebaseConfig } from './config'

 if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
 }
 else{
   firebase.app();
 }

 const AppSwitchNavigator=createSwitchNavigator({
   LoadingScreen:LoadingScreen,
   LoginScreen:LoginScreen,
   DashboardScreen:DashboardScreen
 })

 const AppNavigator=createAppContainer(AppSwitchNavigator)





export default function App(){
  return(
    <AppNavigator/>
  )
}