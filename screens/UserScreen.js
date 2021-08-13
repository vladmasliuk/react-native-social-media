import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import {connect} from 'react-redux';
import {getUserProfile} from '../redux/redux-actions/dataAc';

// Components
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';
import ScreenBanner from '../components/GeneralComponents/ScreenBanner';
import UserProfile from '../components/UserProfile/UserProfile';
import PostCard from '../components/Post/PostCard/PostCard';

// Banner
import ProfileBg from '../assets/img/profile.jpg';

// Loading
import LoadPostCard from '../components/LoadingComponents/LoadPostCard';
import LoadUserProfile from '../components/LoadingComponents/LoadUserProfile';

export class UserScreen extends Component {
    state = {
        profile: null,
        refreshing: false
    };

    componentDidMount() {
        const user = this.props.route.params.user;

        this.props.getUserProfile(user);

        axios.get(`/user/${user}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data;

        const postsMarkup  = loading ? (
            <View>
                <LoadPostCard/>
                <LoadPostCard/>
            </View>
        ) : posts === null ? (
            null
        ) : (
          posts.map((post) => {
            return <PostCard key={post.postId} post={post} navigation={this.props.navigation}/>
          }) 
        )
        return (
            <ScrollView>
                <ScreenBanner background={ProfileBg} title="User"/>
                <ScreenWrap>
                    {this.state.profile === null ? (
                        <LoadUserProfile/>
                    ) : (
                        <UserProfile profile={this.state.profile}/>
                    )}
                    <View style={styles.userPostsWrap}>
                        {postsMarkup}
                    </View>
                </ScreenWrap>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    userPostsWrap:{
        marginTop: 20,
    }
});

UserScreen.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect( mapStateToProps, {getUserProfile})(UserScreen);