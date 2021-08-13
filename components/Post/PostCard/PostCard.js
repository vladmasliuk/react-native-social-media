import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Redux
import { connect } from 'react-redux';

// Components
import DeletePost from '../DeletePost/DeletePost';
import LikeBtn from '../LikeBtn/LikeBtn';

// Paper
import { Card, IconButton } from 'react-native-paper';

// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

class PostCard extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      post: {
          content, postId, createDate, userImg, user, likeTotal, commentTotal
      },
      user: {authenticated, details: {name} }
    } = this.props;

    const deletePostBtn = authenticated && user === name ? (
      <DeletePost postId={postId}/>
    ) : null;

    const likeTotalWord = likeTotal === 1 ? (
      "like"
    ) : (
        "likes"
    );

    const commentTotalWord = commentTotal === 1 ? (
        "comment"
    ) : (
        "comments"
    );
    return (
      <Card style={styles.postCard}>
          {deletePostBtn}
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
        <View style={styles.postCardBar}>
          <View style={styles.postBottomAc}>
            <LikeBtn postId={postId}/>
            <Text>{likeTotal} {likeTotalWord}</Text>
          </View>
          <View style={styles.postBottomAc}>
            <IconButton
              icon="message-reply-text"
              size={18} 
              onPress={() => { this.props.navigation.push('Post Details', {
                postId
              }); 
              }}
            />
            <Text>{commentTotal} {commentTotalWord}</Text>
          </View>
        </View>
      </Card>
    );
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
      fontWeight: "500",
    },

    postText: {
      color: "#707c97",
    },

    postContent:{
      marginTop: 10,
      marginBottom: 10,
    },

    postCardBar:{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },

    postBottomAc: {
      flexDirection: "row",
      alignItems: "center"
    },
});

PostCard.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(PostCard);