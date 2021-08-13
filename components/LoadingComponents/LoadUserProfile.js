import React from 'react';
import { View, StyleSheet } from 'react-native';

const LoadUserProfile = () =>{
    return (
        <View style={styles.userProfile}>
            <View style={styles.profileImg}/>
            <View style={styles.profileName}/>
            <View style={styles.profileData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    userProfile:{
        flexDirection: 'column',
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#D3D3D3',
        marginBottom: 10,
    },
    profileName:{
        width: 70,
        height: 30,
        backgroundColor: '#D3D3D3',
        marginBottom: 10,
    },
    profileData:{
        width: '100%',
        height: 150,
        backgroundColor: '#D3D3D3',
    },
}); 

export default LoadUserProfile;