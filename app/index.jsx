// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base';

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import React from 'react';
import Router, {DefaultRoute, Navigation, Route, RouteHandler} from 'react-router';
import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';

import ResultPanel from './components/ResultPanel.jsx'
import SearchedPlaceStore from './store/SearchedPlaceStore';
import TripReportsStore from './store/TripReportsStore'
import {initGA, trackOutboundLink, trackSearchComplete} from './ga.js'

var initialZoom = 8;
var closeZoom = 13

// not sure why the tmpl.html bootstrap doesn't work; let's just bootstrap ourselves in anyway
document.body.innerHTML += '\
    <title>Climb Plan</title>\
        <div id="target-summary"></div>\
        <div id="research-title"></div>\
        <div id="research-suggestions"></div>\
        <div id="footer"></div>\
        <div id="app"></div>';

initGA();


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
  map.panBy(0, -65); // So the target's not under the search box
  
  SearchedPlaceStore.updatePlace(place)
}


function newSearchedPlace(searchBox, map){
    var places = searchBox.getPlaces();

    if (places.length == 0) {
        map.setZoom(initialZoom);
        return;
    } else {
        goToPlace(places[0], map);
    }
}


SearchedPlaceStore.subscribeToChanges(trackSearchComplete)


var SearchMap = React.createClass({
  propTypes: {
    place: React.PropTypes.object
  },
  componentDidMount(){
    React.findDOMNode(this)
  },
  render(){
    return <div>
        <input 
          id="pac-input" 
          className="controls" 
          type="text" 
          placeholder="Which Mountain? (try: Forbidden Peak)"
        />
        <div id="map-canvas"></div>
      </div>
  }
})

var SearchPage = React.createClass({
  mixins: [Navigation],
  updateUrlForPlace (place) {
      this.setState(this.getUpdatedState())
      this.transitionTo(`/search/${place.place_id}/${place.namePlussed}`)
  },
  updateTripReports (place) {
      this.setState(this.getUpdatedState())
  },
  componentWillMount () {
    SearchedPlaceStore.subscribeToChanges(this.updateUrlForPlace);
    TripReportsStore.subscribeToChanges(this.updateTripReports);

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
        searchBox.setBounds(map.getBounds()); // Bias towards viewport
        var placesService = new google.maps.places.PlacesService(map);
        this.setState({
          searchBox,
          placesService
        })

        if(this.props.params.placeId && !SearchedPlaceStore.isLoaded()){
          // Initial page load with a place ID in the URL
          placesService.getDetails({placeId: this.props.params.placeId}, (place, status)=>{
            document.getElementById('pac-input').value = place.formatted_address
            goToPlace(place, map)
          })
        }

        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching place for that item.
        google.maps.event.addListener(searchBox, 'places_changed', _.partial(newSearchedPlace, searchBox, map));
    }.bind(this));
  },
  getUpdatedState(){
      return {
          place: SearchedPlaceStore.getPlace(),
          searchBox: this.state ? this.state.searchBox : null,
          placesService: this.state ? this.state.placesService : null
      }
  },
  getInitialState(){
      return this.getUpdatedState()
  },
  render () {
    return <div>
      <SearchMap place={this.state.place}/>
      <ResultPanel place={this.state.place}/>
    </div>
  }
});


var routes = (
  <Route>
    <Route path="/" handler={SearchPage}/>
    <Route path="search/:placeId/:placeName" handler={SearchPage}/>
  </Route>
)

Router.run(
  routes,
  Router.HashLocation,
  (Root) => {
    React.render(
      <Root/>, 
      document.getElementById('app')
    )
  }
);

