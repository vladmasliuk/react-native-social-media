import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../../redux/redux-actions/dataAc';

// Paper
import { IconButton } from 'react-native-paper';

export class DeletePost extends Component {

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({open: false});
    }

    render() {
        return (
            <View style={styles.deletePostWrap}>
                <IconButton
                    icon="close"
                    size={18}
                    onPress={this.deletePost}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deletePostWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

DeletePost.propTypes = {
    postId: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default connect(null, {deletePost})(DeletePost);
