import { FETCH_OPERATIONS, FETCH_OPERATIONS_ERROR, FETCH_OPERATIONS_SUCCESS, SEND_OPERATION } from "../conts";

const initialState = {
    operations: [],
    loading: false,
    error: null,
    message: ''
}

export const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OPERATIONS:
            return {
                ...state,
                loading: true
            }
        case FETCH_OPERATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                operations: action.payload
            }
        case FETCH_OPERATIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SEND_OPERATION:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        default:
            return state
    }
}