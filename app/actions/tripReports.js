import {getTripReports} from '../api';

export const REQUEST_TRIP_REPORTS = 'REQUEST_TRIP_REPORTS';
export const RECEIVE_TRIP_REPORTS = 'RECEIVE_TRIP_REPORTS';

export function requestTripReports(queryTime) {
    return {
        type: REQUEST_TRIP_REPORTS,
        queryTime,
    };
}

export function receiveTripReports(queryTime, tripReports) {
    return {
        type: RECEIVE_TRIP_REPORTS,
        tripReports,
        queryTime,
    };
}


export function fetchTripReports(place) {
    return dispatch => {
        const queryTime = Date();
        dispatch(requestTripReports(queryTime));

        getTripReports(place.name, place.lat, place.lon)
           .then(tripReports => dispatch(receiveTripReports(queryTime, tripReports)));
    };
}
