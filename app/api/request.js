import 'whatwg-fetch';
import _ from 'lodash';

function handleError(message, error) {
    if (window.onerror) {
        window.onerror(message, undefined, undefined, undefined, error);
    }

    return Promise.reject(error);
}

function handleResponse(response) {
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

export function post(url, data) {
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
