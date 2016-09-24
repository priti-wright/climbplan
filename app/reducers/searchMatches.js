import {REQUEST_SEARCH_MATCHES, RECEIVE_SEARCH_MATCHES} from '../actions/searchMatches';
import stateWithNewerQueryTime from './stateWithNewerQueryTime';


const searchMatches = (state = {matches: [], queryTime: Date()}, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_MATCHES:
            return stateWithNewerQueryTime(
                state,
                {
                    queryTime: action.queryTime,
                    matches: action.matches,
                },
            );
        default:
            return state;
    }
};

export default searchMatches;
