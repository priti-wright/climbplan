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
import $ from 'jquery';

import ResultPanel from './components/ResultPanel.jsx'
import SearchedPlaceStore from './store/SearchedPlaceStore'
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

function addGpsTrack(googleMaps, map, trackUrl){
  $.ajax({
    type: "GET",
    url: trackUrl,
    dataType: "xml",
    success: function(xml) {
      var points = [];
      var bounds = new googleMaps.LatLngBounds ();
      $(xml).find("trkpt").each(function() {
        var lat = $(this).attr("lat");
        var lon = $(this).attr("lon");
        var p = new googleMaps.LatLng(lat, lon);
        points.push(p);
        bounds.extend(p);
      });

      var poly = new googleMaps.Polyline({
        path: points,
        strokeColor: "#FF00AA",
        strokeOpacity: .5,
        strokeWeight: 1.5
      });
      
      poly.setMap(map);
    }
  });
}

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
  map.panBy(0, -80); // So the target's not under the search box
  
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
    console.log('SearchMap mounted!');
    React.findDOMNode(this.refs.placesSearch).focus();
  },
  render(){
    return <div>
        <input 
          id="pac-input" 
          ref="placesSearch"
          className="controls" 
          type="text" 
          placeholder="Which Mountain? (try: Mount Index)"
          autoFocus={true}
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
  componentDidMount(){
    document.getElementById('pac-input').focus();
  },
  componentWillMount () {
    SearchedPlaceStore.subscribeToChanges(this.updateUrlForPlace)

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
        var input = document.getElementById('pac-input');
        map.controls[google.maps.ControlPosition.CENTER].push(input);

        var searchBox = new google.maps.places.SearchBox((input));
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

        addGpsTrack(google.maps, map, 'DragontailPeak1996-09-22.gpx');
        addGpsTrack(google.maps, map, 'DragontailPeak2010-05-30.gpx');
        addGpsTrack(google.maps, map, 'DragontailPeak2013-06-15.gpx');
        addGpsTrack(google.maps, map, 'DragontailPeak2014-07-12.gpx');
        addGpsTrack(google.maps, map, 'DragontailPeak2015-03-01.gpx');
        addGpsTrack(google.maps, map, 'DragontailPeak2015-05-30.gpx');

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
    var resultPanel = this.state.place?
      <ResultPanel place={this.state.place}/>
      : null
    return <div>
      <SearchMap place={this.state.place}/>
      {resultPanel}
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

