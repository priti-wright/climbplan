import {combineReducers} from 'redux';
import tripReports from './tripReports';
import place from './place';
import searchMatches from './searchMatches';
import searchQuery from './searchQuery';
import weather from './weather';


export default combineReducers({
    tripReports,
    place,
    searchMatches,
    searchQuery,
    weather,
});
