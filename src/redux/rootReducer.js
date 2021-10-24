import {combineReducers} from 'redux';
import bannerReducer from './reducers/bannerReducer';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
export default combineReducers({
    banner: bannerReducer,
    auth: authReducer,
    category: categoryReducer,
});
