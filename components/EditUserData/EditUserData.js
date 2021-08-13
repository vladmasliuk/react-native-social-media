import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {editData} from '../../redux/redux-actions/userAc';

// Paper
import { Button, TextInput, Card, Title } from 'react-native-paper';

export class EditUserData extends Component {
    state={
        mode: 'button',
        about: '',
        localization: '',
    }

    setUsDataState = (details) => {
        this.setState ({
            about: details.about ? details.about : '',
            localization: details.localization ? details.localization : ''
        });
    };

    triggerOpen = () => {
        this.setState({ mode: 'form' });
        this.setUsDataState(this.props.details);
    };
    
    triggerClose = () => {
        this.setState({ mode: 'button' });
    };

    componentDidMount(){
        const { details } = this.props;
        this.setUsDataState(details);
    };

    formSubmit = () => {
        const userDetails = {
            about: this.state.about,
            localization: this.state.localization
        };
        this.props.editData(userDetails);
        this.triggerClose(); 
    };

    render() {
        return (
            <View>
                {this.state.mode === 'button' ? (
                    <Button
                        mode="contained"
                        icon="pencil-outline"
                        style={styles.profileActionsBtn}
                        onPress={this.triggerOpen}
                    >
                        Edit profile data
                    </Button>
                ) : (
                    <Card style={styles.editDataForm}>
                        <Title>Edit your data</Title>
                        <TextInput
                            label="About"
                            style={styles.formInput}
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            value={this.state.about}
                            onChangeText={( about ) => this.setState({ about })}
                        />
                        <TextInput
                            label="Localization"
                            style={styles.formInput}
                            mode="outlined"
                            value={this.state.localization}
                            onChangeText={( localization ) => this.setState({ localization })}
                        />
                        <Card.Actions style={styles.btnFormWrap}>
                            <Button
                                mode="contained"
                                color="red"
                                style={{marginRight: 5}}
                                onPress={this.triggerClose}
                            >
                                Cansel
                            </Button>
                            <Button
                                mode="contained"
                                onPress={this.formSubmit}
                            >
                                Save
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    editDataForm:{
        padding: 15,
    },

    btnFormWrap:{
        flexDirection:"row",
        alignItems:'center', 
        justifyContent:'flex-end',
    },

    formInput:{
        backgroundColor: 'transparent',
        marginBottom: 5,
    },

    profileActionsBtn:{
        marginBottom: 10,
    },
})

EditUserData.propTypes = { 
    editData: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => ({
    details: state.user.details
});

export default connect(mapStateToProps, {editData})(EditUserData);