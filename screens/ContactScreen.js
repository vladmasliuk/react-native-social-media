import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';

// Components
import PageBanner from '../components/GeneralComponents/ScreenBanner';
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';

// Banner
import ContactBg from '../assets/img/contact.jpg'

const ContactScreen = () => {
    return(
        <ScrollView>
            <PageBanner background={ContactBg} title="Contact us"/>
            <ScreenWrap>
                <View style={styles.infoData}>
                    <Text style={styles.infoTitle}>Contact Us</Text>
                    <Text style={styles.infoName}>EMAIL</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:masliuk@wit.edu.pl?subject=Contact')}>
                        <Text style={styles.infoLink}>
                            masliuk@wit.edu.pl
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoData}>
                    <Text style={styles.infoTitle}>Report a problem</Text>
                    <Text style={styles.infoName}>EMAIL</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:masliuk@wit.edu.pl?subject=Problem')}>
                        <Text style={styles.infoLink}>
                            masliuk@wit.edu.pl
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScreenWrap>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    infoData:{
        flex: 1,
        alignItems: 'center',
        marginBottom: 30,
    },
    infoTitle:{
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 5,
    },
    infoName:{
        fontWeight: '700',
    },
    infoLink:{
        color: '#707c97', 
    },
});


export default ContactScreen;