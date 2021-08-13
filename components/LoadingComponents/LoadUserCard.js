import React from 'react';
import { View, StyleSheet } from 'react-native';

const LoadUserCard = () =>{
    return (
        <View style={styles.userCard}>
           <View style={styles.userImg}/>
           <View style={styles.userName}/>
        </View>
    )
}

const styles = StyleSheet.create({
    userCard:{
        marginBottom: 30,
        alignItems: 'center',
        width: '50%',
    },
    userImg:{
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: "#D3D3D3",
        marginBottom: 10,
    },
    userName:{
        width: 80,
        height: 20,
        backgroundColor: "#D3D3D3",
    },
}); 

export default LoadUserCard;