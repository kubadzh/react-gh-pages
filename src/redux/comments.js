
//We will now cause this reducer to update its part of the state when the ADD_COMMENT dispatched to the store 
//this means we need to import from the ActionTypes module, and we will use "wildcard" syntax


import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};