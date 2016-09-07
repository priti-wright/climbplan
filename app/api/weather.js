import {post} from './request';

export function getWeather(name, lat, lon) {
    const placeRequest = {data: {name, lat, lon}};
    return post('https://trfind.herokuapp.com/weather', placeRequest)
    .then(response => response.data);
}
