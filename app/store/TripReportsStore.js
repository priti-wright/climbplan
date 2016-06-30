import _ from 'lodash';

import {subscribeToChanges} from './SearchedPlaceStore.js'

var tripReports = [];
var listeners = new Set([]);
var loaded = false;

const API_URL = 'http://www.google.com/'

var TripReportsStore = {
    isLoaded:()=>{
        return loaded
    },
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
        const dummyDate = new Date;
        tripReports = [
            {
                site: 'Ali Baba',
                link: 'www.example.com',
                date: dummyDate,
                title: null,
                route: 'Fire Falls',
                has_gps: null,
                has_photos: null,
            },
            {
                site: 'The Googles',
                link: 'www.google.com',
                date: dummyDate,
                title: 'Mount Dooooom',
                route: 'The Scary Cleaver',
                has_gps: true,
                has_photos: true,
            }
        ]
        loaded = true;
        listeners.forEach(function(listener){listener(place)})
    }
}

subscribeToChanges(TripReportsStore.updatePlace)
export default TripReportsStore
