import {
    SET_FILTER_TYPE, SET_KID_STATE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: action.payload
            };
        case SET_KID_STATE:
            return {
                ...state,
                isKidActive: action.payload
            };
        default:
            return state;
    }
};