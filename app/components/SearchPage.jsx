import React from 'react';
import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';

import {History} from 'react-router';

import {receivePlace} from '../actions/place';
import ResultPanel from '../containers/ResultPanel';
import SearchMap from '../containers/SearchMap';


const initialZoom = 8;
const closeZoom = 13;
GoogleMapsLoader.KEY = 'AIzaSyARGjjjbuHuxEgPU9BajclhyCWmiW5i9RI';

function goToPlace(place, map) {
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
            strokeWeight: 10,
        },
    });
    map.panBy(0, 400); // So the target's not under the search box
}

function newSearchedPlace(dispatch, searchBox, map) {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
        map.setZoom(initialZoom);
    } else {
        goToPlace(places[0], map);
        dispatch(receivePlace(places[0]));
    }
}

const SearchPage = React.createClass({
    propTypes: {
        params: React.PropTypes.object,
        place: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    },
    mixins: [History],
    componentWillMount() {
        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.load(google => {
            const mtIndex = new google.maps.LatLng(47.77, -121.58);
            const map = new google.maps.Map(
                document.getElementById('map-canvas'),
                {
                    disableDefaultUI: true,
                    draggable: true,
                    initialLoc: mtIndex,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    center: mtIndex,
                    zoom: initialZoom,
                    scrollwheel: false,
                }
            );

            // Create the search box and link it to the UI element.
            const input = /** @type {HTMLInputElement} */(
              document.getElementById('pac-input'));

            const searchBox = new google.maps.places.SearchBox((input));
            searchBox.setBounds(map.getBounds()); // Bias towards viewport
            const placesService = new google.maps.places.PlacesService(map);

            // Initial page load with a place ID in the URL
            if (this.props.params.placeId && !this.props.place.id) {
                placesService.getDetails({placeId: this.props.params.placeId}, place => {
                    document.getElementById('pac-input').value = place.formatted_address;
                    goToPlace(place, map);
                    this.props.dispatch(receivePlace(place));
                });
            }

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching place for that item.
            google.maps.event.addListener(searchBox, 'places_changed', _.partial(newSearchedPlace, this.props.dispatch, searchBox, map));
        });
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.place !== nextProps.place) {
            this.updateUrlForPlace(nextProps.place);
        }
    },
    render() {
        return (
            <div>
              <SearchMap />
              <ResultPanel />
            </div>
        );
    },
    updateUrlForPlace(place) {
        this.history.pushState(null, `/search/${place.place_id}/${place.namePlussed}`);
    },
});

export default SearchPage;
