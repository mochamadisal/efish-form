import {SET_AUTHORIZATION} from '../actions/AuthAction';

const initialState = {
    authorization: {
        token: '',
        id: 0,
    },
};
export default (state = initialState, action) => {
    switch (action.type) {
    case SET_AUTHORIZATION:
        return {
            ...state,
            authorization: action.data,
        };
    default:
        return state;
    }
};
