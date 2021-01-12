//we are importing from ActionTypes.js module using "wildcard"-'*' allows to import all the export-named at once. We also use name spase "as ", which we will use in our f below
//Next, we define action creator function "addComment", we need to pass in all the values to add a comment, this function will return an object
//which has as its properties a 'type' and a 'payload'.
//ActionTypes.ADD_COMMENT - this lets us access the ADD_COMMENT export
// Goto comments.js...

import * as ActionTypes from './ActionTypes';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});