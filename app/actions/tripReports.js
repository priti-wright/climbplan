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



export function fetchTripReports(name, lat, lon) {
   return (dispatch, getState) => {
       const {tripReports} = getState();

       dispatch(requestTripReports());

       getTripReports(name, lat, lon)
           .then(tripReports => dispatch(receiveTripReports(tripReports)))
           .catch(onError);
   };
}
