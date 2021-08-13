import React from 'react';
import { View, StyleSheet } from 'react-native';

const LoadProfileSettings = () =>{
    return (
        <View style={styles.container}>
           <View style={styles.userImg}/>
           <View style={styles.userName}/>
           <View style={styles.userActions}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        padding: 20,
    },
    userImg:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#D3D3D3',
        marginBottom: 10,
    },
    userName:{
        width: 80,
        height: 20,
        backgroundColor: '#D3D3D3',
        marginBottom: 20,
    },
    userActions:{
        width: '100%',
        height: 200,
        backgroundColor: '#D3D3D3',
    },
}); 

export default LoadProfileSettings;