import _ from 'lodash';
import {RECEIVE_PLACE} from '../actions/place';

const parsePlace = place => {
    const {areaName, id, name, lat, lon} = place;
    return {
        id, 
        lat,
        latShort: lat.toFixed(3),
        lon,
        lonShort: lon.toFixed(3),
        name,
        nameUrlEncoded: name.replace(' ', '%20'),
        nameHypenated: name.replace(' ', '-'),
        namePlussed: name.replace(' ', '+'),
    };
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
