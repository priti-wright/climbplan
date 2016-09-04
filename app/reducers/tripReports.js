import {REQUEST_TRIP_REPORTS, RECEIVE_TRIP_REPORTS} from '../actions/tripReports';

const tripReports = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case REQUEST_TRIP_REPORTS:
            return {
                items: [],
                isFetching: true,
            };
        case RECEIVE_TRIP_REPORTS:
            return {
                items: action.tripReports,
                isFetching: false,
            };
        default:
            return state;
    }
};

export default tripReports;
