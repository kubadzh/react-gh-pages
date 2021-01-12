
//We will now cause this reducer to update its part of the state when the ADD_COMMENT dispatched to the store 
//this means we need to import from the ActionTypes module, and we will use "wildcard" syntax


import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment); // We are taking existing state, an array of objects, and then concatinating Comments object to the end of an array and then it returns that new state to the redux store, next we will update several react componenets to enable dispatching this action
        default:
            return state;
    }
};
