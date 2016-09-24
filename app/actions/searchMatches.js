import {searchGeonamesPlaces} from '../api';

export const REQUEST_SEARCH_MATCHES = 'REQUEST_SEARCH_MATCHES';
export const RECEIVE_SEARCH_MATCHES = 'RECEIVE_SEARCH_MATCHES';

export function requestSearchMatches(queryTime, query) {
    return {
        type: REQUEST_SEARCH_MATCHES,
        query,
        queryTime,
    };
}

export function receiveSearchMatches(queryTime, matches) {
    return {
        type: RECEIVE_SEARCH_MATCHES,
        queryTime,
        matches,
    };
}


export function fetchSearchMatches(query) {
    return dispatch => {
        const queryTime = Date();
        dispatch(requestSearchMatches(queryTime, query));

        searchGeonamesPlaces(query)
           .then(matches => dispatch(receiveSearchMatches(queryTime, matches)));
    };
}
