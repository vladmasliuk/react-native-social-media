import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const PageBanner = ({background, title}) => {
    return (
        <ImageBackground source={background} style={styles.image}>
            <View style={styles.darkBg}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    darkBg:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
    },
    text:{
        fontSize: 35,
        color: 'rgba(255, 255, 255, .6)',
        letterSpacing: 15,
        textTransform: 'uppercase',
        fontWeight: "700",
        textAlign: 'center',
    }
});

export default PageBanner;