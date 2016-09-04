import React from 'react';
import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';

import {History} from 'react-router';

import {receivePlace} from '../actions/place'
import {setQueryAndPlaceFromUrl} from '../actions/searchQuery'
import ResultPanel from '../containers/ResultPanel'
import SearchBox from '../containers/SearchBox'
import SearchMap from '../containers/SearchMap'
import {trackOutboundLink, trackSearchComplete} from '../ga.js'


const initialZoom = 8;
const closeZoom = 13;
GoogleMapsLoader.KEY = 'AIzaSyARGjjjbuHuxEgPU9BajclhyCWmiW5i9RI';

function goToPlace(placeName, placeLatLon, map) {
    map.setCenter(placeLatLon);
    map.setZoom(closeZoom);
    new google.maps.Marker({
        map: map,
        title: placeName,
        position: placeLatLon,
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
                    draggable: false,
                    initialLoc: mtIndex,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    center: mtIndex,
                    zoom: initialZoom,
                    scrollwheel: false,
                }
            );
            this.setState({map});
            if (this.props.place.id) {
              goToPlace(place.name, {lat:place.lat, lng:place.lon}, map);
            }

            // Initial page load with stuff already in the URL - go figure out what's up
            if (this.props.params.placeName && !this.props.place.id) {
                const {placeName, placeLat, placeLon} = this.props.params;
                this.props.dispatch(
                    setQueryAndPlaceFromUrl(placeName, placeLat, placeLon)
                )
            }
        });
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.place !== nextProps.place) {
            // this.updateUrlForPlace(nextProps.place);
            const place = nextProps.place;
            if (this.state.map) {
                goToPlace(place.name, {lat:place.lat, lng:place.lon}, this.state.map);
            }
            if (place.id && (this.props.params.placeId != place.id)){
                this.updateUrlForPlace(place);
            }
        }
    },
    render() {
        return (
            <div>
              <SearchBox />
              <SearchMap />
              <ResultPanel />
            </div>
        );
    },
    updateUrlForPlace(place) {
        this.history.pushState(null, `/search/${encodeURIComponent(place.name)}/${place.lat}/${place.lon}`);
    },
});

export default SearchPage;
