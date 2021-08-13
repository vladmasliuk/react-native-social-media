import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {addPost, removeError} from '../../../redux/redux-actions/dataAc';

// Components
import ErrorAlert from '../../GeneralComponents/ErrorAlert';

// Paper
import { Button, Card, Title, TextInput } from 'react-native-paper';

export class AddPostBtn extends Component {
    state = {
        mode: 'button',
        content: '',
        errors: {} 
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
            errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ content: '', mode: 'button', errors: {} });
        }
    }

    triggerOpen = () => {
        this.setState({ mode: 'form' });
    };
    
    triggerClose = () => {
        this.props.removeError();
        this.setState({ mode: 'button', errors: {} });
    };

    formSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({ content: this.state.content });
    };
    render() {
        const { errors } = this.state;
        const {UI: { loading } } = this.props;

        return (
            <View>
                {this.state.mode === 'button' ? (
                    <Button
                        mode="contained"
                        icon="plus"
                        onPress={this.triggerOpen}
                    >
                        Add post
                    </Button>
                ) : (
                    <Card style={styles.addPostForm}>
                        <Title>Add new post</Title>
                        <View style={styles.inputWrap}>
                            <TextInput
                                label="Content"
                                style={styles.formInput}
                                mode="outlined"
                                multiline
                                numberOfLines={4}
                                onChangeText={( content ) => this.setState({ content })}
                            />
                            <ErrorAlert error={errors.content}/>
                        </View>
                        <Card.Actions style={styles.btnFormWrap}>
                            <Button
                                mode="contained"
                                color="red"
                                style={{marginRight: 5}}
                                onPress={this.triggerClose}
                            >
                                Cansel
                            </Button>
                            {loading ? (
                                <Button
                                    mode="contained"
                                    loading={true}
                                    disabled={true}
                                >
                                    Add post
                                </Button>
                            ) : (
                                <Button
                                    mode="contained"
                                    onPress={this.formSubmit}
                                >
                                    Add post
                                </Button>
                            )}
                        </Card.Actions>
                    </Card>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addPostForm:{
        padding: 15,
    },

    btnFormWrap:{
        flexDirection:"row",
        alignItems:'center', 
        justifyContent:'flex-end',
    },

    inputWrap: {
        marginBottom: 5,
    },

    formInput:{
        backgroundColor: 'transparent',
    },
})

AddPostBtn.propTypes = {
    addPost: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, {addPost, removeError})(AddPostBtn);