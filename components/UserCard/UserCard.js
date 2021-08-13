import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

class UserCard extends Component {
    render() {
        const {
            usercard: {
                imgUrl, name, email
            }
        } = this.props;

        const user = name;
        return (
            <View style={styles.userCard}>
                <TouchableOpacity 
                    onPress={() => { this.props.navigation.push('User', {
                        user
                    }); 
                    }}
                >
                    <Image
                        style={styles.userImg}
                        source={{uri: imgUrl}}
                    />
                </TouchableOpacity>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
            </View>
        )
    }
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
    },

    userName:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 5,
    },

    userEmail: {
        color: '#707c97',
    },
})

export default UserCard;