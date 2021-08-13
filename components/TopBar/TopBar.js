import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';

// Redux
import {connect} from 'react-redux';

// Paper
import { Appbar } from 'react-native-paper';

// Components
import Notices from '../Notices/Notices'

class TopBar extends Component {
  render(){
    const {authenticated} = this.props; 
    const navigation = this.props.navigation;
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="menu"
                onPress={() => {navigation.openDrawer()}}
            />
            {!authenticated ? (
              null
            ) : (
              <>
                <Notices navigation={navigation}/>
              </>
            )}
        </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
});

const mapStateToProps = state =>({
  authenticated: state.user.authenticated,
})


export default connect(mapStateToProps)(TopBar);