import {combineReducers} from 'redux';

const initialState = {
    loading: false,
    error: null,
    data: null,
};

export default combineReducers({
    main: (state = initialState, action) => {
        switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        default:
            return state;
        }
    },
});

