import React from 'react';
import GoogleMapsLoader from 'google-maps';


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
    map.panBy(0, 70); // Just a lil visual bump
}

const SearchMap = React.createClass({
    propTypes: {
        place: React.PropTypes.object,
        className: React.PropTypes.string.isRequired,
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.load(google => {
            const mtIndex = new google.maps.LatLng(47.77, -121.58);
            const map = new google.maps.Map(
                document.getElementById('map-canvas'),
                {
                    disableDefaultUI: true,
                    disableDoubleClickZoom: true,
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
                const {place} = this.props;
                goToPlace(place.name, {lat: place.lat, lng: place.lon}, map);
            }
        });
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.place !== nextProps.place) {
            const place = nextProps.place;
            if (this.state.map) {
                goToPlace(place.name, {lat: place.lat, lng: place.lon}, this.state.map);
            }
        }
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    handleResize() {
        const {lat, lon} = this.props.place;
        if (this.state.map && this.props.place.id) {
            this.state.map.setCenter({lat, lng: lon});
        }
    },
    render() {
        return (
            <div>
                <div className={this.props.className} id="map-canvas" />
            </div>
        );
    },
});


export default SearchMap;
