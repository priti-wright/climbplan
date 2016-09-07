import {RECEIVE_QUERY} from '../actions/searchQuery';

const searchMatches = (state = '', action) => {
    switch (action.type) {
        case RECEIVE_QUERY:
            return action.query;
        default:
            return state;
    }
};

export default searchMatches;
