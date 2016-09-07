import {searchGeonamesPlaces} from '../api';

export const REQUEST_SEARCH_MATCHES = 'REQUEST_SEARCH_MATCHES';
export const RECEIVE_SEARCH_MATCHES = 'RECEIVE_SEARCH_MATCHES';

export function requestSearchMatches(query) {
    return {
        type: REQUEST_SEARCH_MATCHES,
        query,
    };
}

export function receiveSearchMatches(searchMatches) {
    return {
        type: RECEIVE_SEARCH_MATCHES,
        searchMatches,
    };
}


export function fetchSearchMatches(query) {
    return dispatch => {
        dispatch(requestSearchMatches(query));

        searchGeonamesPlaces(query)
           .then(searchMatches => dispatch(receiveSearchMatches(searchMatches)));
    };
}
