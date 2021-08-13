import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScreenWrap = ({children}) => {
    return (
        <View style={styles.screenWrap}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    screenWrap: {
        padding: 20,
    },
});

export default ScreenWrap;