import { CONSUM, RECEIP } from "../conts";

const initialState = {
    consum: 0,
    receip: 0
}

export const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSUM:
            return {
                ...state,
                consum: action.payload
            }
        case RECEIP:
            return {
                ...state,
                receip: action.payload
            }
        default:
            return state
    }
}