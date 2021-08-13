import React from 'react';
import { View, StyleSheet } from 'react-native';

const LoadPostCard = () =>{
    return (
        <View style={styles.postCard}>
            <View style={styles.postUserData}>
                <View style={styles.userImg}/>
                <View style={styles.userName}/>
            </View>
            <View style={styles.postContent}/>
        </View>
    )
}

const styles = StyleSheet.create({
    postCard:{
        width: "100%",
        padding: 20,
        marginBottom: 20,
    },
    postUserData:{
        flexDirection: "row"
    },
    userImg:{
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 10,
        backgroundColor: "#D3D3D3",
    },
    userName:{
        width: 40,
        height: 15,
        backgroundColor: "#D3D3D3",
    },
    postContent:{
        marginTop: 20,
        width: "100%",
        height: 100,
        backgroundColor: "#D3D3D3",
    }
}); 

export default LoadPostCard;