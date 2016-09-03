import {RECEIVE_PLACE} from '../actions/place'

const parsePlace = (place) => {
    var name = place.name.replace('Mt ', 'Mount ') // Google likes to abbreviate this :(
    var lat = place.geometry.location.lat();
    var lon = place.geometry.location.lng();
    return _.merge(
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
        place
    )
}

const place = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PLACE:
      return parsePlace(action.place);
    default:
      return state;
    }
}

export default place;
