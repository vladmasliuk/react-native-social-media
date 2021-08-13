import { 
    SET_POSTS, 
    LIKE_POST,
    UNLIKE_POST,
    LOAD_DATA,
    REMOVE_POST,
    ADD_POST,
    SET_POST,
    ADD_COMMENT,
    SET_USERS
} from '../types';

const initState = {
    posts: [],
    post: {},
    users: [],
    loading: false
};

let index;

export default function dataRe(state = initState, action) {
    switch (action.type) {
      case LOAD_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false 
        };
      case SET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false 
        };
      case SET_POST:
      return {
        ...state,
        post: action.payload
      };
      case LIKE_POST:
      case UNLIKE_POST:
        index = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        state.posts[index] = action.payload;
        if (state.post.postId === action.payload.postId) {
          state.post = action.payload;
        }
        return {
          ...state
        };
      case REMOVE_POST:
        index = state.posts.findIndex(
          (post) => post.postId === action.payload
        );
        state.posts.splice(index, 1);
        return {
          ...state
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
      default:
        return state;
    }
}