import _ from 'lodash';
import {RECEIVE_PLACE} from '../actions/place';

const parsePlace = place => {
    const name = place.name.replace('Mt ', 'Mount '); // Google likes to abbreviate this :(
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    return _.merge(
        {
            lat,
            latShort: lat.toFixed(3),
            lon,
            lonShort: lon.toFixed(3),
            name,
            nameUrlEncoded: name.replace(' ', '%20'),
            nameHypenated: name.replace(' ', '-'),
            namePlussed: name.replace(' ', '+'),
        },
        place
    );
};

const place = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PLACE:
            return parsePlace(action.place);
        default:
            return state;
    }
};

export default place;
