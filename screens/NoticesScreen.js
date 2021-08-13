import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { markNoticesOpened } from '../redux/redux-actions/userAc';

// Components
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';

import { IconButton } from 'react-native-paper';

export class NoticesScreen extends Component {

    notifOpen = () => {
        let unreadNotificationsIds = this.props.notices
            .filter((not) => !not.read)
            .map((not) => not.noticeId);
        this.props.markNoticesOpened(unreadNotificationsIds);
    };

    componentDidMount(){
        this.notifOpen();
    }

    render() {
        const notices = this.props.notices;
        dayjs.extend(relativeTime);

        let noticesMarkup = notices && notices.length > 0 ?(
            notices.map((not) => {
                const postId = not.postId;
                const verb = not.type === 'like' ? 'liked' : 'commented';
                const date = dayjs(not.createDate).fromNow();
                const iconColor = not.read ? 'blue' : 'red';
                const icon = not.type === 'like' ? (
                    <IconButton icon="heart" color={iconColor}/>
                ) : (
                  <IconButton icon="message-reply-text" color={iconColor}/>
                );

                return (
                    <View key={not.createDate}>
                        <TouchableOpacity onPress={() => { this.props.navigation.push('Post Details', {
                            postId,
                        });}}>
                            <View style={styles.noticeItem}>
                                {icon}
                                <Text style={styles.noticeText}>
                                    {not.shipper} {verb} your post {date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })
        ) : (
                <Text style={styles.emptyNoticeText}>
                    You dont have any notifications :(
                </Text>
            );

        return (
            <ScrollView>
                <ScreenWrap>
                    {noticesMarkup}
                </ScreenWrap>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    noticeItem:{
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center'
    },
    noticeText:{
        fontSize: 15
    },
    emptyNoticeText:{
        textAlign: 'center',
        fontSize: 15
    }
  });

NoticesScreen.propTypes = {
    markNoticesOpened: PropTypes.func.isRequired,
    notices: PropTypes.array.isRequired
};
    
const mapStateToProps = (state) => ({
    notices: state.user.notices
});

export default connect(mapStateToProps, { markNoticesOpened })(NoticesScreen);