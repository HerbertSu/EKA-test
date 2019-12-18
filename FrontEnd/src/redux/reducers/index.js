import {combineReducers} from 'redux';
import {userReducer} from './userReducers';
import {teachersReducer} from './teachersReducers'
import {studentsReducer} from './studentsReducers';
import {classesReducers} from './classesReducers';

export default combineReducers({
    userReducer,
    classesReducers,
    studentsReducer,
    teachersReducer
})