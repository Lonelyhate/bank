import {
    ADD_SUM,
    FETCH_USER,
    FETCH_USER_AUTH,
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    USER_LOGOUT,
} from '../conts';

const initialState = {
    currentUser: null,
    error: null,
    isAuth: false,
    loading: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                isAuth: true,
                loading: false,
            };
        case FETCH_USER_AUTH:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                isAuth: true,
                loading: false,
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case USER_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                currentUser: null,
                isAuth: false,
            };
        case ADD_SUM:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAuth: true,
                error: null
            };
        default:
            return state;
    }
};
