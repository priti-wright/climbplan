import {getTripReports} from '../api'

export const REQUEST_TRIP_REPORTS = 'REQUEST_TRIP_REPORTS';
export const RECEIVE_TRIP_REPORTS = 'RECEIVE_TRIP_REPORTS';

export function requestTripReports() {
   return {
       type: REQUEST_TRIP_REPORTS,
   };
}

export function receiveTripReports(tripReports) {
   return {
       type: RECEIVE_TRIP_REPORTS,
       tripReports,
   };
}



export function fetchTripReports(place) {
   return (dispatch, getState) => {
       const {tripReports, place} = getState();

       dispatch(requestTripReports());

       getTripReports(place.name, place.lat, place.lon)
           .then(tripReports => dispatch(receiveTripReports(tripReports)));
   };
}
