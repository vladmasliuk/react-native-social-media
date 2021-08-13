import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types'
import { Video } from 'expo-av';

// Redux
import {connect} from 'react-redux';
import {registrationUs} from '../redux/redux-actions/userAc';

// Components
import ErrorAlert from '../components/GeneralComponents/ErrorAlert';

// Paper
import { TextInput, Button } from 'react-native-paper';

// Video
import VideoBg from '../assets/video/video-bg.mp4';

class RegistrationScreen extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confPassword: '',
            name: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    };

    regSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const regUserData = {
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword,
            name: this.state.name
        }
        this.props.registrationUs(regUserData);
    };
    render() { 
        const {UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Video 
                        source={VideoBg}
                        style={styles.videoBg} 
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                    />

                    <View style={styles.formWrap}>
                        <Text style={styles.formTitle}>Registration</Text>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    label="E-mail"
                                    style={styles.formInput}
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                                <ErrorAlert error={errors.email} />
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    label="Password"
                                    style={styles.formInput}
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                <ErrorAlert error={errors.password}/>
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    label="Confirm Password"
                                    style={styles.formInput}
                                    secureTextEntry={true}
                                    value={this.state.confPassword}
                                    onChangeText={(confPassword) => this.setState({ confPassword })}
                                />
                                <ErrorAlert error={errors.confPassword}/>
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    label="Name / Login"
                                    style={styles.formInput}
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                                <ErrorAlert error={errors.name}/>
                                {errors.general && (
                                    <ErrorAlert error={errors.general}/>
                                )}
                            </View>
                            {loading ? (
                                <Button
                                    mode="contained"
                                    loading={true}
                                    disabled={true}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    mode="contained"
                                    onPress={this.regSubmit}
                                >
                                    Submit
                                </Button>
                            )}
                            <TouchableOpacity onPress={() => { this.props.navigation.push('Login') }}>
                                <Text style={styles.formText}>
                                    You can login here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    videoBg: {
        width: '100%',
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        height: height,
    },

    formWrap:{
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 6,
        marginTop: 100,
    },

    formTitle:{
        fontSize: 30,
        letterSpacing: 2,
        color: '#0D1C2E', 
        marginBottom: 20,
    },

    inputWrap: {
        marginBottom: 5,
    },

    formInput:{
        backgroundColor: 'transparent',
    },

    formText:{
        marginTop: 20,
        textAlign: 'center',
    },
});

RegistrationScreen.propTypes = {
    registrationUs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {registrationUs})(RegistrationScreen);