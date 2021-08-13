import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';

// Redux
import {connect} from 'react-redux';
import {getPosts} from '../redux/redux-actions/dataAc';

// Components
import ScreenBanner from '../components/GeneralComponents/ScreenBanner';
import ScreenWrap from '../components/GeneralComponents/ScreenWrap';
import PostCard from '../components/Post/PostCard/PostCard';
import AddPostBtn from '../components/Post/AddPostBtn/AddPostBtn';

// Banner
import HomeBg from '../assets/img/home.jpg'

// Loading
import LoadPostCard from '../components/LoadingComponents/LoadPostCard';

class HomeScreen extends Component {
  state = {
      refreshing: false
  };
  componentDidMount(){
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.getPosts();
      }
    );
  }
  
  triggerRefresh = () => {
      this.setState({refreshing: true});
      this.props.getPosts();
      this.setState({refreshing: false});
  }
  render() {
    const {posts , loading} = this.props.data;
    let latestPosts = !loading ? (
        posts.map((post) => (
          <PostCard key={post.postId} post={post} navigation={this.props.navigation}/>)
        )
    ) : (
          <View>
            <LoadPostCard/>
            <LoadPostCard/>
          </View>
        ) 
    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.triggerRefresh}
          />
        }
      >
        <ScreenBanner background={HomeBg} title="Posts"/>
        <ScreenWrap>
          <AddPostBtn/>
          <View style={styles.postLoop}>
            {latestPosts}
          </View>
        </ScreenWrap>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  postLoop:{
    marginTop: 20,
  },
}); 

HomeScreen.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getPosts})(HomeScreen);