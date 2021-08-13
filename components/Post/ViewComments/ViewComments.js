import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Components
import CommentItem from '../CommentItem/CommentItem';

export class ViewComments extends Component {
    render() {
        const { comments } = this.props;
        let commentsMarkup = comments ? (
            comments.map((comment) => 
                <CommentItem key={comment.createDate} comment={comment} navigation={this.props.navigation}/>
            )
        ) : null
        return (
            <View style={styles.commentsWrap}>
                {commentsMarkup}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    commentsWrap:{
        marginTop: 20,
    },
})

ViewComments.propTypes = {
    comments: PropTypes.array
};

export default ViewComments