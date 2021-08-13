import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

// Redux
import {connect} from 'react-redux';

class DrawerContent extends Component {
    render(){
        const {authenticated} = this.props;
        const {navigation} = this.props;
        return (
            <DrawerContentScrollView>
                <View style={styles.drawerContainer}>
                    {!authenticated ? (
                        <>
                            <DrawerItem
                                label="Login"
                                onPress={ () => {navigation.navigate('Login')}}
                            />
                            <DrawerItem
                                label="Registration"
                                onPress={() => {navigation.navigate('Registration')}}
                            />
                            <DrawerItem
                                label="Contact"
                                onPress={() => {navigation.navigate('Contact')}}
                            />
                        </>
                    ) : (
                        <>
                            <DrawerItem
                                label="Home"
                                onPress={ () => {navigation.navigate('Home')}}
                            />
                            <DrawerItem
                                label="All Users"
                                onPress={ () => {navigation.navigate('All Users')}}
                            /> 
                            <DrawerItem
                                label="Profile Settings"
                                onPress={() => { navigation.navigate('Profile settings') }}
                            />
                            <DrawerItem
                                label="Contact"
                                onPress={() => { navigation.navigate('Contact') }}
                            />
                        </>
                    )}
                </View>
            </DrawerContentScrollView>
        );
    }
}

const styles = StyleSheet.create({
    drawerContainer:{
        flex: 1,
        padding: 10,
    },
})


const mapStateToProps = state =>({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(DrawerContent);