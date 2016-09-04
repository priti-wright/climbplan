import {receivePlace} from './place'
import {getGeonamesPlace} from '../api'

export const RECEIVE_QUERY = 'RECEIVE_QUERY';

export function receiveQuery(query) {
    return {
        type: RECEIVE_QUERY,
        query,
    };
}

export function setQueryAndPlaceFromUrl(placeName, lat, lon){
    return (dispatch) => {
        dispatch(receiveQuery(placeName));
        getGeonamesPlace(placeName, lat, lon).then(
            place => dispatch(receivePlace(place))
        )
    };
}