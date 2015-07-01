import _ from 'lodash';

var place
var listeners = new Set([]);

var SearchedPlaceStore = {
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
        place = newPlace
        listeners.forEach(function(listener){listener()})
    }
}
export default SearchedPlaceStore