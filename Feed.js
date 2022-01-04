import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Postcard from "./Postcard";
import { FlatList } from 'react-native-gesture-handler';

let posts=require("./temp_stories.json")

export default class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    renderItem = ({ item: post }) => {
        return <Postcard post={post} navigation={this.props.navigation} />;
    };

    

    keyExtractor=(item,index)=>index.toString

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.driodSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                        source={require("../assets/logo.png")}
                        style={{width:'100%', height:'100%', resizeMode:'contain'}}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={posts}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'purple'
    },
    driodSafeArea:{
        marginTop:Platform.OS==="andriod"?StatusBar.currentHeight:RFValue(35)
    },
    appTitle:{
        flex:0.07,
        flexDirection:"row"
    },
    appIcon:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    applTitleTextContainer:{
        flex:0.8,
        justifyContent:'center',

    }, 
    appTitleText:{
       color:'white',
       fontSize:28,
       textAlign:'center',
       textDecorationLine:'underline'
    },
    cardContainer:{
        flex:0.85,
    }
    
})