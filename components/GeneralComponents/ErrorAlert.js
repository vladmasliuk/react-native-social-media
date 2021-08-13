import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ErrorAlert = ({error}) => {
    return(
        <Text style={styles.error}>{error}</Text>
    )
};

const styles = StyleSheet.create({
    error: {
        color: '#e02626',
        fontSize: 12,
    },
});

ErrorAlert.propTypes = {
    error: PropTypes.string,
};


export default ErrorAlert