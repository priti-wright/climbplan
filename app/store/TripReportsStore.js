import _ from 'lodash';

import {subscribeToChanges} from './SearchedPlaceStore.js'

var tripReports = [];
var listeners = new Set([]);
const updateListeners = (tripReports) => listeners.forEach(function(listener){listener(tripReports)});

const statusNoRequest = {};
const statusSearching = {};
const statusLoaded = {};

var loaded = false;
var status = statusNoRequest;

const trfindURL = 'https://trfind.herokuapp.com/find';

const prepTripReport = (report) => {
    return _.merge(
        {},
        report,
        {
            date: new Date(report.date),
        }
    );
};

const TripReportsStore = {
    getStatus:()=>status,
    isLoaded:()=>status === statusLoaded,
    getTripReports:()=>{
        return tripReports
    },
    subscribeToChanges:(callback)=>{
        listeners.add(callback)
    },
    unsubscribe:(callback)=>{
        listeners.delete(callback);
    },
    updatePlace:(newPlace)=>{
        console.log('Searching for', newPlace);
        status = statusSearching;
        updateListeners(tripReports);

        const {name, lat, lon} = newPlace;
        const placeRequest = {data: {name, lat, lon}};
        const request = new XMLHttpRequest();
        request.open('POST', trfindURL, true);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        request.onreadystatechange = function () {
            const DONE = this.DONE || 4;
            if (this.readyState === DONE){
                tripReports = _(
                    JSON.parse(this.responseText).data.map(prepTripReport)
                ).sortBy('date').reverse().value();
                console.log('Found trip reports:', tripReports);
                status === statusLoaded;
                updateListeners(tripReports);
            }
        };
        request.send(JSON.stringify(placeRequest));
    }
}

subscribeToChanges(TripReportsStore.updatePlace);
export default TripReportsStore
