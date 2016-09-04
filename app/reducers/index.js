import {combineReducers} from 'redux';
import tripReports from './tripReports';
import place from './place';
import weather from './weather';


export default combineReducers({
    tripReports,
    place,
    weather,
});
