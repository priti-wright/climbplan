import {connect} from 'react-redux';
import WeatherPanel from '../components/WeatherPanel';


const mapStateToProps = state => {
    return {
        place: state.place,
    };
};

const WeatherContainer = connect(
  mapStateToProps
)(WeatherPanel);

export default WeatherContainer;
