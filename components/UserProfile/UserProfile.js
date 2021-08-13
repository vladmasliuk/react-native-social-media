import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Redux
import {connect} from 'react-redux';

// Components
import AddPostBtn from '../Post/AddPostBtn/AddPostBtn';

const UserProfile = (props) => {
    const {
        profile: { name, createDate, imgUrl, about, localization, email },
        user: { details }
    } = props;

    const addPost = name === details.name ? (
        <AddPostBtn/>
    ) : (
        null
    )
    return (
        <View>
            <View style={styles.userProfile}>
                <Image
                    style={styles.profileImg}
                    source={{uri: imgUrl}}
                />
                <Text style={styles.profileName}>{name}</Text>
                {about && (
                    <>
                        <Text style={styles.aboutProfileTitle}>About</Text>
                        <Text style={styles.aboutProfileText}>{about}</Text>
                    </>
                )}
                {localization && (
                    <>
                        <Text style={styles.aboutProfileTitle}>Localization</Text>
                        <Text style={styles.aboutProfileText}>{localization}</Text>
                    </>
                )}
                <Text style={styles.aboutProfileTitle}>E-mail</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
                    <Text style={styles.aboutProfileText}>{email}</Text>
                </TouchableOpacity>
                <Text style={styles.aboutProfileTitle}>Joined</Text>
                <Text style={styles.aboutProfileText}>{dayjs(createDate).format('MMM YYYY')}</Text>
            </View>
            {addPost}
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

    profileName:{
        fontSize: 30,
        letterSpacing: 2,
    },

    profileImg:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
    },

    aboutProfileTitle:{
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: '700',
        marginTop: 15,
    },

    aboutProfileText:{
        textAlign: 'center'
    },
});

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect( mapStateToProps )(UserProfile);