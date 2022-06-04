import { CONSUM, RECEIP } from '../conts';
import axios from 'axios';

export const getConsum = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/api/operation/consum/${id}`);
        dispatch({
            type: CONSUM,
            payload: response.data,
        });
    };
};

export const getReceip = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/api/operation/coming/${id}`);
        dispatch({
            type: RECEIP,
            payload: response.data,
        });
    };
};
