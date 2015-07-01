// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base';

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import React from 'react';
import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';

import ResultPanel from './components/ResultPanel.jsx'
import SearchedPlaceStore from './store/SearchedPlaceStore'
import {initGA, trackOutboundLink, trackSearchComplete} from './ga.js'


var initialZoom = 8;
var closeZoom = 13

// not sure why the tmpl.html bootstrap doesn't work; let's just bootstrap ourselves in anyway
document.body.innerHTML += '\
    <title>Hike Planner</title>\
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>\
        <input id="pac-input" className="controls" type="text" placeholder="Which Mountain? (try: Mount Index)"/>\
        <div id="map-canvas"></div>\
        <div id="target-summary"></div>\
        <div id="research-title"></div>\
        <div id="research-suggestions"></div>\
        <div id="footer"></div>\
        <div id="app"></div>';

initGA();

function newPlace(searchBox, map){
    var places = searchBox.getPlaces();

    if (places.length == 0) {
        map.setZoom(initialZoom);
        return;
    } else {
        var place = places[0];
        map.setCenter(place.geometry.location);
        map.setZoom(closeZoom);
        new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 30,
              strokeColor: 'white',
              strokeOpacity: 0.5,
              strokeWeight: 10
            },
        });
        map.panBy(0, -80); // So the target's not under the search box
        
        SearchedPlaceStore.updatePlace(place)

        trackSearchComplete(place);
    }
}


GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.load(function(google) {
    var mtIndex = new google.maps.LatLng(47.77, -121.58);
    var map = new google.maps.Map(
        document.getElementById('map-canvas'),
        {
          disableDefaultUI: true,
          draggable: true,
          initialLoc: new google.maps.LatLng(47.77, -121.58),
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          center: mtIndex,
          zoom: initialZoom,
          scrollwheel: false
        }
    );

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.CENTER].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching place for that item.
    google.maps.event.addListener(searchBox, 'places_changed', _.partial(newPlace, searchBox, map));
}.bind(this));



React.render(
    <ResultPanel/>, 
    document.getElementById('app')
);

