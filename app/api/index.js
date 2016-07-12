import fetch from 'isomorphic-fetch'

function post(url, data) {
   return fetch(url, {
       credentials: 'same-origin',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json;charset=UTF-8',
       },
       body: JSON.stringify(data),
   })
   .then(handleResponse)
   .catch(error => handleError(`An API failure occured while posting JSON to "${url}"`, error));
}

function parseTripReports(response) {
   return response.data;
}

export function getTripReports(name, lat, lon) {
  const placeRequest = {data: {name, lat, lon}};
  return post('https://trfind.herokuapp.com/find', placeRequest)
    .then(parseTripReports)
    .catch(() => {
      return [];
    });
}
