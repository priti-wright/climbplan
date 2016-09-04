import {getWeather} from '../api';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';

export function requestWeather() {
    return {
        type: REQUEST_WEATHER,
    };
}

export function receiveWeather(weather) {
    return {
        type: RECEIVE_WEATHER,
        weather,
    };
}


export function fetchWeather(place) {
    return dispatch => {
        dispatch(requestWeather());

        getWeather(place.name, place.lat, place.lon)
           .then(tripReports => dispatch(receiveWeather(tripReports)));
    };
}
