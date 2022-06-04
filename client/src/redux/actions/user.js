import { ADD_SUM, FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT } from '../conts';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const userRegistration = (fio, number, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_USER });
            const response = await axios.post('http://localhost:5000/api/user/registration', {
                fio,
                number,
                password,
            });
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: jwtDecode(response.data.token),
            });
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: e.response.data.message,
            });
        }
    };
};

export const auth = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_USER });
            const response = await axios.get('http://localhost:5000/api/user/auth', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: jwtDecode(response.data.token),
            });
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token');
            dispatch({
                type: FETCH_USER_ERROR,
                payload: e.response.data.message,
            });
        }
    };
};

export const userLogin = (number, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_USER });
            const response = await axios.post('http://localhost:5000/api/user/login', {
                number,
                password,
            });
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: jwtDecode(response.data.token),
            });
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: e.response.data.message,
            });
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_LOGOUT });
        } catch (e) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: e.response.data.message,
            });
        }
    };
};

export const userAddSum = (id, sum) => {
    return async (dispatch) => {
        const response = await axios.put('http://localhost:5000/api/user/add', { id, sum });
        dispatch({
            type: ADD_SUM,
            payload: jwtDecode(response.data.token),
        });
        localStorage.setItem('token', response.data.token);
    };
};
