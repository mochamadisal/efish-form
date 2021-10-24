import {SET_CATEGORY} from '../actions/categoryAction';

const initialState = {
    category: {
        content: '',
    },
    isLoading: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
    case SET_CATEGORY:
        return {
            ...state,
            category: action.data,
            isLoading: true,
        };
    default:
        return state;
    }
};
