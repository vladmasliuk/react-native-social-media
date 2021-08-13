import {
    SET_ERRORS,
    REMOVE_ERRORS,
    LOAD_UI,STOP_LOAD_UI
} from '../types';

const initState = {
    loading: false,
    errors: null
};

export default function uiRe(state = initState, action) {
    switch (action.type) {
        case SET_ERRORS:
        return {
            ...state,
            loading: false,
            errors: action.payload
        };
        case REMOVE_ERRORS:
        return {
            ...state,
            loading: false,
            errors: null
        };
        case LOAD_UI:
        return {
            ...state,
            loading: true
        };
        case STOP_LOAD_UI:
        return {
        ...state,
        loading: false
        };
    default:
        return state;
    }
}