import {get} from './request';


const WEATHER_GOV_URL = 'https://api.weather.gov/points/';

function parseForecastResult(name, lat, lon, forecastResult) {
    const weather = {
        'periods': forecastResult.properties.periods
    };
    weather[name] = {
        name: name,
        lat: Number(lat),
        lon: Number(lon),
        periods: forecastResult.properties.periods,
    };
    return weather;
}

export function getWeatherForecast(name, lat, lon) {
    let headers = new Headers({
        "Accept"       : "application/geo+json",
        // "User-Agent"   : "...@gmail.com" // A User Agent is required to identify your application, but this seems silly. https://forecast-v3.weather.gov/documentation
    });
    return get(
    WEATHER_GOV_URL +
    `${lat},${lon}` +
    '/forecast',
    headers
  ).then(
    responseJSON => parseForecastResult(name, lat, lon, responseJSON)
  );
}