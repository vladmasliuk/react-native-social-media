import {
    SET_USER,
    SET_AUTH,
    SET_UNAUTH,
    LOAD_USER,
    LIKE_POST,
    UNLIKE_POST,
    MARK_NOTICES_OPEN
} from '../types';


const initState = {
    authenticated: false,
    loading: false,
    details: {},
    likes: [],
    notices: []
};

export default function userRe(state = initState, action) {
    switch (action.type) {
      case SET_AUTH:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTH:
        return initState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOAD_USER:
      return {
        ...state,
        loading: true
      };
      case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            user: state.details.name,
            postId: action.payload.postId
          }
        ]
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        )
      };
      case MARK_NOTICES_OPEN:
      state.notices.forEach((not) => (not.read = true));
      return {
        ...state
      };
      default:
        return state;
    }
  }