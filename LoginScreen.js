import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Google from "expo-google-app-auth";
import firebase from 'firebase'

import AppLoading from "expo-app-loading"
import { RFValue } from 'react-native-responsive-fontsize';

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    onSignIn=googleUser=>{
        var unsubscribe=firebase.auth().onAuthStateChanged(firebaseUser=>{
            unsubscribe();
            if(!this.isUserEqual(googleUser, firebaseUser)){
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase
                .auth()
                .signInWithCredential(credential)
                .then(function(result){
                    if(result.additionalUserInfo.isNewUser){
                        firebase
                        .database()
                        .ref("/users/"+result.user.uid)
                        .set({
                            gmail:result.user.email,
                            profile_picture:result.additionalUserInfo.profile.picture,
                            locale:result.additionalUserInfo.profile.locale,
                            first_name:result.additionalUserInfo.profile.given_name,
                            last_name:result.additionalUserInfo.profile.familyu_name,
                            current_theme:"dark"

                        })
                        .then(function(snapshot){});
                    }
                    })
                    .catch(error => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                      });
                  } else {
                    console.log("User already signed-in Firebase.");
                  }
                })
            }
    
            signInWithGoogleAsync = async () => {
              try {
                const result = await Google.logInAsync({
                  behaviour: "web",
                  androidClientId:
                  "465705825613-pr2d2e50mhg449b3slcgdmccpmjhncun.apps.googleusercontent.com",
                iosClientId:
                "465705825613-v1jh46osajcoigbgeda345md19isd742.apps.googleusercontent.com",
                  scopes: ["profile", "email"]
                });
          
                if (result.type === "success") {
                  this.onSignIn(result);
                  return result.accessToken;
                } else {
                  return { cancelled: true };
                }
              } catch (e) {
                console.log(e.message);
                return { error: true };
              }
            };
          
    
    isUserEqual=(googleUser,firebaseUser)=>{
        if(firebaseUser){
            var providerData= firebaseUser.providerData;
            for(var i=0; i<providerData.length;i++){
                if(
                    providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID && 
                    providerData[i].uid===googleUser.getBasicProfile().getId()){
                        return true;

                }
            }
        }
        return false;
    }
     
    render(){
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.appIcon}
                ></Image>
                <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>{
                     this.signInWithGoogleAsync()
                  }
                }>
                  <Image
                  source={require("../assets/google_icon.png")}
                  style={styles.googleIcon}
                  >
                    
                  </Image>
                  <Text style={styles.googleText}>
                    Sign in With Google
                  </Text>
                        
                  </TouchableOpacity>
                </View>
                <View style={styles.cloudContainer}>
                  <Image
                  source={require("../assets/cloud.png")}
                  style={styles.cloudImage}
                  ></Image>
                
              </View>
            </View>
          );
        }
      }
    


const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
      },
      droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
      },
      appTitle: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
      },
      appIcon: {
        width: RFValue(130),
        height: RFValue(130),
        resizeMode: "contain"
      },
      appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        fontFamily: "Georgia"
      },
      buttonContainer:{
        flex:0.4,
        justifyContent:'center',
        alignItems:'center'
      },
    button:{
      width:RFValue(250),
      height:RFValue(50),
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      borderRadius:RFValue(30),
      backgroundColor:'white'
    },
    googleIcon:{
        width:RFValue(30),
        height:RFValue(30),
        resizeMode:'contain'
    },
    googleText: {
      color: "black",
      fontSize: RFValue(20),
      fontFamily: "Georgia"
    },
    cloudContainer: {
      flex: 0.3
    },
    cloudImage: {
      position: "absolute",
      width: "100%",
      resizeMode: "contain",
      bottom: RFValue(-5)
    }
    
    
    
    });