import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import { infoReducer } from './infoReducer'
import { operationsReducer } from './operationsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    info: infoReducer,
    operations: operationsReducer
})

export default rootReducer