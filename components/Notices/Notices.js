import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../../redux/redux-actions/userAc';

// Paper
import { IconButton, Badge } from 'react-native-paper';

class Notices extends Component {

    componentDidMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                this.props.getUserData();
            }
        );
    }
    
    triggerNotifOpen = () => {
        this.props.navigation.push('Notices');
    }

    render() {
        const notices = this.props.notices;

        dayjs.extend(relativeTime);

        let noticesIcon;
        if (notices && notices.length > 0) {
            notices.filter((not) => not.read === false).length > 0
            ? (noticesIcon = (
                <View style={styles.noticeBtn}>
                    <TouchableOpacity onPress={this.triggerNotifOpen}>
                        <Badge size={17} style={styles.notifCount}>
                            {notices.filter((not) => not.read === false).length}
                        </Badge>
                        <IconButton icon="bell" size={25}/>
                    </TouchableOpacity>
                </View>
            )) : (noticesIcon = (
                <TouchableOpacity onPress={this.triggerNotifOpen}>
                    <IconButton icon="bell" size={25}/>
                </TouchableOpacity>
                ));
        } else {
            noticesIcon = (
                <TouchableOpacity onPress={this.triggerNotifOpen}>
                    <IconButton icon="bell" size={25}/>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                {noticesIcon}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noticeBtn:{
      width: 50,
      position: 'relative',
    },

    notifCount:{
        position: 'absolute'
    }
  });

Notices.propTypes = {
    notices: PropTypes.array.isRequired,
    getUserData: PropTypes.func.isRequired,
};
    
const mapStateToProps = (state) => ({
    user: state.user,
    notices: state.user.notices,
});


export default connect(mapStateToProps, {getUserData})(Notices);