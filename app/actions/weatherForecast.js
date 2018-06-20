import {getWeatherForecast} from '../api';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';

export function requestWeather(queryTime) {
    return {
        type: REQUEST_WEATHER,
        queryTime,
    };
}

export function receiveWeather(queryTime, weather) {
    return {
        type: RECEIVE_WEATHER,
        weather,
        queryTime,
    };
}


export function fetchWeather(place) {
    return dispatch => {
        const queryTime = Date();
        dispatch(requestWeather(queryTime));

        getWeatherForecast(place.name, place.lat, place.lon)
           .then(weather => dispatch(receiveWeather(queryTime, weather)));
    };
}
