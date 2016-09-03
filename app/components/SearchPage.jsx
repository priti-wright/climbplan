import React from 'react';
import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';

import {History} from 'react-router';

import reducers from '../reducers';
import {receivePlace} from '../actions/place'
import ResultPanel from '../containers/ResultPanel'
import SearchMap from '../containers/SearchMap'
import {trackOutboundLink, trackSearchComplete} from '../ga.js'


var initialZoom = 8;
var closeZoom = 13;
GoogleMapsLoader.KEY = 'AIzaSyARGjjjbuHuxEgPU9BajclhyCWmiW5i9RI';

function goToPlace(place, map){
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
  map.panBy(0, 400); // So the target's not under the search box
}


function newSearchedPlace(dispatch, searchBox, map){
    var places = searchBox.getPlaces();

    if (places.length == 0) {
        map.setZoom(initialZoom);
        return;
    } else {
        goToPlace(places[0], map);
        dispatch(receivePlace(places[0]));
    }
}

const SearchPage = React.createClass({
  mixins: [History],
  updateUrlForPlace (place) {
      this.history.pushState(null, `/search/${place.place_id}/${place.namePlussed}`)
  },
  componentWillReceiveProps(nextProps){
    if (this.props.place !== nextProps.place){
      this.updateUrlForPlace(nextProps.place);
    }
  },
  componentWillMount () {
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load(function(google) {
        var mtIndex = new google.maps.LatLng(47.77, -121.58);
        var map = new google.maps.Map(
            document.getElementById('map-canvas'),
            {
              disableDefaultUI: true,
              draggable: true,
              initialLoc: mtIndex,
              mapTypeId: google.maps.MapTypeId.TERRAIN,
              center: mtIndex,
              zoom: initialZoom,
              scrollwheel: false
            }
        );

        // Create the search box and link it to the UI element.
        var input = /** @type {HTMLInputElement} */(
          document.getElementById('pac-input'));
        // map.controls[google.maps.ControlPosition.CENTER].push(input);

        var searchBox = new google.maps.places.SearchBox((input));
        searchBox.setBounds(map.getBounds()); // Bias towards viewport
        var placesService = new google.maps.places.PlacesService(map);

        if(this.props.params.placeId && !this.props.place.id){
          // Initial page load with a place ID in the URL
          placesService.getDetails({placeId: this.props.params.placeId}, (place, status)=>{
            document.getElementById('pac-input').value = place.formatted_address
            goToPlace(place, map)
            this.props.dispatch(receivePlace(place));
          })

        }

        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching place for that item.
        google.maps.event.addListener(searchBox, 'places_changed', _.partial(newSearchedPlace, this.props.dispatch, searchBox, map));
    }.bind(this));
  },
  render () {
    return <div>
      <SearchMap />
      <ResultPanel />
    </div>
  }
});

export default SearchPage;
