import {REQUEST_WEATHER, RECEIVE_WEATHER} from '../actions/weather';

const weather = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case REQUEST_WEATHER:
            return {
                items: [],
                isFetching: true,
            };
        case RECEIVE_WEATHER:
            return {
                items: action.weather,
                isFetching: false,
            };
        default:
            return state;
    }
};

export default weather;
