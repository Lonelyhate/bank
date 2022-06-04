import axios from 'axios';
import { FETCH_OPERATIONS, FETCH_OPERATIONS_SUCCESS, SEND_OPERATION } from '../conts';

export const getOperations = (id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_OPERATIONS });
        const response = await axios.get(`http://localhost:5000/api/operation/${id}`);
        dispatch({
            type: FETCH_OPERATIONS_SUCCESS,
            payload: response.data,
        });
    };
};

export const sendMoney = (senderId, recipientNumber, sum) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_OPERATIONS });
        const response = await axios.post('http://localhost:5000/api/operation', {
            senderId,
            recipientNumber,
            sum,
        });
        dispatch({
            type: SEND_OPERATION,
            payload: response.data.message
        })
    };
};
