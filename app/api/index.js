import 'whatwg-fetch';
import _ from 'lodash';

export function handleError(message, error) {
   if (window.onerror) {
       window.onerror(message, undefined, undefined, undefined, error);
   }

   return Promise.reject(error);
}

export function handleResponse(response) {
   return response.json()
       .then(json => {
           // Returned parsed json if response is valid
           if (response.ok) {
               return json;
           }

           // Otherwise reject with an error object that will get caught in handleError.
           return Promise.reject(new Error(json.error));
       });
}

function post(url, data) {
   return fetch(url, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       mode: 'cors',
       body: JSON.stringify(data),
   })
   .then(handleResponse)
   .catch(error => handleError(`An API failure occured while posting JSON to "${url}"`, error));
}

export function get(url) {
    return fetch(url)
      .then(handleResponse)
      .catch(error => handleError(`An API failure occured while posting JSON to "${url}"`, error));
}

const prepTripReport = (report) => {
    return _.merge(
        {},
        report,
        {
            date: new Date(report.date),
        }
    );
};

function parseTripReports(response) {
  return _(
      response.data.map(prepTripReport)
  ).sortBy('date').reverse().value();
}

export function getTripReports(name, lat, lon) {
  const placeRequest = {data: {name, lat, lon}};
  return post('https://trfind.herokuapp.com/find', placeRequest)
    .then(parseTripReports);
}

const GEONAMES_USERNAME = 'climbplan'

export function searchGeonamesPlaces(query) {
  /* Search for natural features matching the query */
  return get(
    `http://api.geonames.org/searchJSON?` + 
    `username=${GEONAMES_USERNAME}` +
    `&name_startsWith=${encodeURIComponent(query)}` +
    `&maxRows=15&countryBias=USA&featureClass=T&orderby=relevance`
  ).then(
    responseJSON => _(responseJSON.geonames)
    .map(
      geonamesResult => {
        return {
          name: geonamesResult.name,
          lat: Number(geonamesResult.lat),
          lon: Number(geonamesResult.lng),
          id: geonamesResult.geonameId,
          areaName: geonamesResult.adminCode1
           ? `${geonamesResult.adminCode1}, ${geonamesResult.countryCode}`
           : geonamesResult.countryCode,
        }
      }
    )
    .value()
  )
}