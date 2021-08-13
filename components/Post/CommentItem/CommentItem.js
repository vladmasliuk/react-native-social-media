import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export class CommentItem extends Component {
    render() {
        const {
            comment: {
                userImg, createDate, user, content
            }
        } = this.props;
        return (
            <View>
                <View style={styles.comment}>
                    <TouchableOpacity onPress={() => { this.props.navigation.push('User', {user})}}>
                        <Image
                            style={styles.userImg}
                            source={{uri: userImg}}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.userName}>{user}</Text>
                        <Text style={styles.commentDate}>{dayjs(createDate).format('h:mm a, MMMM DD YYYY')}</Text>
                        <Text style={styles.commentText}>{content}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    comment:{
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
    },

    userImg:{
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 10,
    },

    userName:{
        fontWeight: '500',
    },

    commentDate:{
        color: '#707c97',
        marginBottom: 5,
    },

    commentText:{
        color: '#707c97',
    }
})

CommentItem.propTypes = {
    comment: PropTypes.object
};

export default CommentItem;
