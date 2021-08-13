import { AsyncStorage } from 'react-native';
import {
    SET_USER,
    SET_ERRORS,
    REMOVE_ERRORS,
    LOAD_UI,
    SET_UNAUTH,
    LOAD_USER,
    MARK_NOTICES_OPEN
} from '../types';

import axios from 'axios'; 

export const loginUs = (userData) => (dispatch) => {
    dispatch({ type: LOAD_UI });
    axios
    .post('/login', userData)
    .then(res => {
        authHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: REMOVE_ERRORS });
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const registrationUs = (regUserData) => (dispatch) => {
    dispatch({ type: LOAD_UI });
    axios
    .post('/registration', regUserData)
    .then(res => {
        authHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: REMOVE_ERRORS });
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    })
};

export const exitUs = () => (dispatch) => {
    AsyncStorage.removeItem('FireToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTH });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOAD_USER });
    axios.get('/user')
    .then((res) => {
    dispatch({
        type: SET_USER,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};

export const uploadProfileImg = (formData) => (dispatch) => {
    dispatch({ type: LOAD_USER });
    axios
    .post('/user/img', formData)
    .then(() => {
        dispatch(getUserData());
    })
    .catch((err) => console.log(err));
}; 

export const editData = (userDetails) =>(dispatch) => {
    dispatch({ type: LOAD_USER });
    axios
    .post('/user', userDetails) 
    .then(() => {
    dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNoticesOpened = (noticeIds) => (dispatch) => {
    axios
    .post('/notices', noticeIds)
    .then((res) => {
    dispatch({
        type: MARK_NOTICES_OPEN
    });
    })
    .catch((err) => console.log(err));
}

const authHeader = (token) => {
    const FireToken = `Bearer ${token}`;
    AsyncStorage.setItem('FireToken', FireToken);
    axios.defaults.headers.common['Authorization'] = FireToken;
};