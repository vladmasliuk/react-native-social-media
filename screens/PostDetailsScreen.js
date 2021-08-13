import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { getPostDetails, removeError } from '../redux/redux-actions/dataAc';

// Components
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';
import AddComment from '../components/Post/AddComment/AddComment';
import ViewComments from '../components/Post/ViewComments/ViewComments';

// Paper
import { Card } from 'react-native-paper';

class PostDetailsScreen extends Component {
        state = {
            postId: this.props.route.params.postId,
            refreshing: false,
        };

        componentDidMount(){
            this.props.getPostDetails(this.state.postId);
            this.props.removeError();
        }

        triggerRefresh = () => {
            this.setState({refreshing: true});
            this.props.getPostDetails(this.state.postId);
            this.setState({refreshing: false});
        }
    render() {
        const {
            post: {
                content,
                createDate,
                userImg,
                user,
                comments
            }
        } = this.props;

        return (
            <ScrollView 
                refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.triggerRefresh}
                />
                }
            >
                <ScreenWrap>
                    <Card style={styles.postCard}>
                        <View style={styles.postCardBar}>
                            <View style={styles.postUserData}>
                                <TouchableOpacity 
                                    onPress={() => { this.props.navigation.push('User', {
                                        user
                                    }); 
                                }}>
                                    <Image 
                                    style={styles.userImg}
                                    source={{uri: userImg}}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.userName}>{user}</Text>
                            </View>
                            <Text style={styles.postText}>{dayjs(createDate).fromNow()}</Text>
                        </View>
                        <View style={styles.postContent}>
                            <Text style={styles.postText}>{content}</Text>
                        </View>
                        <AddComment postId={this.state.postId}/>
                        <ViewComments navigation={this.props.navigation} comments={comments}/>
                    </Card>
                </ScreenWrap>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    postCard:{
      marginBottom: 20,
      padding: 20,
      borderRadius: 6,
    },

    postUserData:{
      flexDirection: "row",
      flexWrap: "wrap",
    },

    userImg:{
      width: 50,
      height: 50,
      borderRadius: 50/2,
      marginRight: 10,
    },

    userName: {
      fontWeight: '500',
    },

    postText: {
      color: '#707c97',
    },

    postContent:{
      marginTop: 10,
      marginBottom: 10,
    },

    postCardBar:{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'space-between',
      alignItems: 'center',
    },
});

PostDetailsScreen.propTypes = {
    removeError: PropTypes.func.isRequired,
    getPostDetails: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    post: state.data.post,
});

const mapActionsToProps = {
    getPostDetails,
    removeError
};

export default connect( mapStateToProps, mapActionsToProps)(PostDetailsScreen);
