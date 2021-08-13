import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {getUsers} from '../redux/redux-actions/dataAc';

// Components
import PageBanner from '../components/GeneralComponents/ScreenBanner';
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';
import UserCard from '../components/UserCard/UserCard'

// Paper
import { TextInput } from 'react-native-paper';

// Banner
import UsersBg from '../assets/img/users.jpg'

// Loading
import LoadUserCard from '../components/LoadingComponents/LoadUserCard';

class AllUsersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    componentDidMount(){
        this.props.getUsers();
    }
    render() {
        const {users, loading} = this.props.data;
        let filteredUsers = users.filter(users => {
            return users.name
                .toString()
                .toLowerCase()
                .includes(this.state.search.toLowerCase());
        });

        let allUsers = !loading ? (
            filteredUsers.map((usercard) => 
                <UserCard key={usercard.userId} usercard={usercard} navigation={this.props.navigation}/>
            )
        ) : (
            <View style={styles.container}>
                <LoadUserCard/>
                <LoadUserCard/>
            </View>
        )
       
        return (
           <ScrollView>
                <PageBanner background={UsersBg} title="Users"/>
                <ScreenWrap>
                    <TextInput
                        label="Search by name"
                        style={styles.formInput}
                        value={this.state.search}
                        onChangeText={( search ) => this.setState({ search })}
                    />
                    <View style={styles.container}>
                        {allUsers}
                    </View>
                </ScreenWrap>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    formInput:{
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
})


AllUsersScreen.propTypes = {
    getUsers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    data: state.data,
});
  
export default connect(mapStateToProps, {getUsers})(AllUsersScreen);