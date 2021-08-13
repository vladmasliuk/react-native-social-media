import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getUserData, uploadProfileImg, exitUs } from '../redux/redux-actions/userAc';

// Components
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';
import EditUserData from '../components/EditUserData/EditUserData';

// Paper
import { Button } from 'react-native-paper';

// Image upload
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";

// Loading
import LoadProfileSettings from '../components/LoadingComponents/LoadProfileSettings';

export class UserSettingsScreen extends Component {
    changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        const newImageUri =  "file:///" + result.uri.split("file:/").join("");
        const formData = new FormData();
        formData.append('img', {
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        this.props.uploadProfileImg(formData);
      };

    exitUs = () => {
        this.props.exitUs();
    };

    componentDidMount(){
        this.props.getUserData();
    }

    render() {
        const {user: {details : {name, imgUrl}, loading}} = this.props;
        const user = name;
        const profile = !loading ? (
            <ScrollView>
                <ScreenWrap>
                    <View style={styles.container}>
                        <Image
                            style={styles.userImg}
                            source={{uri: imgUrl}}
                        />
                        <Text style={styles.userName}>{user}</Text>
                    </View>
                    <View style={styles.profileActions}>
                        <Button 
                            mode="contained"
                            icon="account-box"
                            style={styles.profileActionsBtn}
                            onPress={() => { this.props.navigation.push('User', {
                                user
                            }); 
                            }}
                        >
                            View profile
                        </Button>
                        <EditUserData/>
                        <Button
                             mode="contained"
                             icon="image"
                             style={styles.profileActionsBtn}
                             onPress={this.changeImage}
                        >
                            Change image
                        </Button>
                        <Button
                             mode="contained"
                             icon="logout"
                             color="red"
                             onPress={this.exitUs}
                        >
                            Logout
                        </Button>
                    </View>
                </ScreenWrap>
            </ScrollView>
        ) : (
            <LoadProfileSettings/>
        )
        return profile
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },

    userImg:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
    },

    userName:{
        fontSize: 30,
        letterSpacing: 2,
    },

    profileActions:{
        marginTop: 20,
    },

    profileActionsBtn:{
        marginBottom: 10,
    },
});

UserSettingsScreen.propTypes = {
    user: PropTypes.object.isRequired,
    exitUs: PropTypes.func.isRequired,
    uploadProfileImg: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    exitUs, 
    uploadProfileImg,
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(UserSettingsScreen);