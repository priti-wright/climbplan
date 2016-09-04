import {connect} from 'react-redux';
import {WeatherPanel} from '../components/WeatherPanel';


const mapStateToProps = state => {
    return {
        place: state.place,
        weather: state.weather.items,
        isFetching: state.tripReports.isFetching,
    };
};

const WeatherContainer = connect(
  mapStateToProps
)(WeatherPanel);

export default WeatherContainer;
