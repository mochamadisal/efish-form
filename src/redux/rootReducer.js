import {combineReducers} from 'redux';
import globalDataReducers from './reducers';
export default combineReducers({
    global: globalDataReducers,
});
