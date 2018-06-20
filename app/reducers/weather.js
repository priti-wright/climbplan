import {REQUEST_WEATHER, RECEIVE_WEATHER} from '../actions/weatherForecast';
import stateWithNewerQueryTime from './stateWithNewerQueryTime';


const weather = (state = {areas: {}, isFetching: false, queryTime: Date()}, action) => {
    switch (action.type) {
        case REQUEST_WEATHER:
            return {
                ...state,
                isFetching: true,
                queryTime: state.queryTime,
            };
        case RECEIVE_WEATHER:
            return stateWithNewerQueryTime(
                state,
                {
                    areas: Object.assign(action.weather, state.areas),
                    isFetching: false,
                    queryTime: action.queryTime,
                }
            );
        default:
            return state;
    }
};

export default weather;
