import {combineReducers} from 'redux';
import tripReports from './tripReports';
import place from './place';


export default combineReducers({
    tripReports,
    place,
});
