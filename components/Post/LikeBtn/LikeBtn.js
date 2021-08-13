import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../redux/redux-actions/dataAc';

// Paper
import { IconButton } from 'react-native-paper';

export class LikeBtn extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId))
        return true;
        else return false;
    };

    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }
    render() {
        const likeBtn = this.likedPost() ? (
            <IconButton
                icon="heart"
                size={18}
                onPress={this.unlikePost}
            />
        ) : (
            <IconButton
                icon="heart-outline"
                size={18}
                onPress={this.likePost}
            />
        )
        return likeBtn;
    }
}

LikeBtn.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost, 
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeBtn);