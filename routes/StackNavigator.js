import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import AllUsersScreen from '../screens/AllUsersScreen';
import UserScreen from '../screens/UserScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import NoticesScreen from '../screens/NoticesScreen';
import ContactScreen from '../screens/ContactScreen';

// Components
import TopBar from '../components/TopBar/TopBar';

// Redux
import {connect} from 'react-redux';

class StackNavigator extends Component {
    render() {
        const Stack = createStackNavigator();
        const {authenticated} = this.props;
        return (
            <Stack.Navigator
                screenOptions={{
                    header: (props) => <TopBar {...props} />,
                }}
            >
                {!authenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Registration" component={RegistrationScreen}/>
                        <Stack.Screen name="Contact" component={ContactScreen}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Post Details" component={PostDetailsScreen}/>
                        <Stack.Screen name="All Users" component={AllUsersScreen}/>
                        <Stack.Screen name="User" component={UserScreen}/>
                        <Stack.Screen name="Contact" component={ContactScreen}/>
                        <Stack.Screen name="Profile settings" component={UserSettingsScreen}/>
                        <Stack.Screen name="Notices" component={NoticesScreen}/>
                    </>
                )}
            </Stack.Navigator>
        )
    }
}

const mapStateToProps = state =>({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(StackNavigator);