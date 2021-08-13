import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { addComment } from '../../../redux/redux-actions/dataAc';

// Components
import ErrorAlert from '../../GeneralComponents/ErrorAlert';

// Paper
import { TextInput,  Button } from 'react-native-paper';

export class AddComment extends Component {
    state = {
        content: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ content: '' });
        }
    }

    formSubmit = (event) => {
        event.preventDefault();
        this.props.addComment(this.props.postId, { content: this.state.content });
    };
    render() {
        const errors = this.state.errors;
        return (
            <View>
                <View style={styles.addCommentWrap}>
                    <TextInput
                        label="Comment"
                        style={styles.formInput}
                        value={this.state.content}
                        onChangeText={( content ) => this.setState({ content })}
                    />
                    <ErrorAlert error={errors.comment}/>
                </View>
                    <Button
                        mode="contained"
                        icon="message-reply-text"
                        onPress={this.formSubmit}
                    >
                        Add comment
                    </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addCommentWrap:{
        marginTop: 5,
        marginBottom: 5,
    },

    formInput:{
        backgroundColor: 'transparent',
    },
})

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};
  
const mapStateToProps = (state) => ({
    UI: state.UI,
});
  
export default connect(mapStateToProps, {addComment})(AddComment);