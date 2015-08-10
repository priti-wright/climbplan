import _ from 'lodash';

var place
var listeners = new Set([]);
var loaded = false;

var SearchedPlaceStore = {
    isLoaded:()=>{
        return loaded
    },
    getPlace:()=>{
        return place
    },
    subscribeToChanges:(callback)=>{
        listeners.add(callback)
    },
    unsubscribe:(callback)=>{
        listeners.delete(callback);
    },
    updatePlace:(newPlace)=>{
        // Yeah sure this is supposed to go through an event dispatcher. maybe eventually
        var name = newPlace.name.replace('Mt ', 'Mount ') // Google likes to abbreviate this :(
        var lat = newPlace.geometry.location.G
        var lon = newPlace.geometry.location.K
        place = _.merge(
            {
                lat,
                latShort: lat.toFixed(3),
                lon,
                lonShort: lon.toFixed(3),
                name, 
                nameUrlEncoded: name.replace(' ', '%20'),
                nameHypenated: name.replace(' ','-'),
                namePlussed: name.replace(' ','+')
            },
            newPlace
        )
        loaded = true;
        listeners.forEach(function(listener){listener(place)})
    }
}
export default SearchedPlaceStore