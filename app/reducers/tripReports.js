import {REQUEST_TRIP_REPORTS, RECEIVE_TRIP_REPORTS} from '../actions/tripReports';
import valueWithNewerQueryTime from './valueWithNewerQueryTime';


const tripReports = (state = {items: [], isFetching: false, queryTime: Date()}, action) => {
    switch (action.type) {
        case REQUEST_TRIP_REPORTS:
            return {
                items: [],
                isFetching: true,
                queryTime: state.queryTime,
            };
        case RECEIVE_TRIP_REPORTS:
            return valueWithNewerQueryTime(
                state,
                {
                    items: action.tripReports,
                    isFetching: false,
                    queryTime: action.queryTime,
                }
            );
        default:
            return state;
    }
};

export default tripReports;
