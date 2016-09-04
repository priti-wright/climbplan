import {post} from './request';

const prepTripReport = report => {
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