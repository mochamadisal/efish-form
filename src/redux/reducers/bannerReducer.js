import {SET_BANNER} from '../actions/bannerAction';

const initialState = {
    banner: {
        content: '',
        recomendation: true,
    },
    isLoading: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
    case SET_BANNER:
        return {
            ...state,
            banner: action.data,
            isLoading: true,
        };
    default:
        return state;
    }
};
