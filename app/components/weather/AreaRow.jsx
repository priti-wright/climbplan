import {connect} from 'react-redux';
import React from 'react';

import {fetchWeather} from '../../actions/weatherForecast';
import WeatherCell from './WeatherCell';
import styles from './AreaRow.scss';

const WEATHER_GOV_PUBLIC_URL = 'https://forecast-v3.weather.gov/point/';
const WEATHER_GOV_TABLE_URL = 'https://www.wrh.noaa.gov/forecast/wxtables/index.php';


function getWeatherLink(lat, lon) {
    return WEATHER_GOV_PUBLIC_URL + `${lat},${lon}`;
}

function getWeatherLinkPlus(lat, lon) {
    return WEATHER_GOV_TABLE_URL + `?lat=${lat}&lon=${lon}`;
}

const AreaRow = React.createClass({
    componentWillMount() {
        this.props.dispatch(fetchWeather(this.props.area));
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.area && nextProps.area && this.props.area.id !== nextProps.area.id) {
            this.props.dispatch(fetchWeather(nextProps.area));
        }
    },
    render() {
        const {name, lat, lon} = this.props.area;
        const {topRow} = this.props;
        if (this.props.isFetching || (!this.props.weather)) {
            return topRow ? (<span> Searching ... </span>) : null;
        }
        const days = this.props.weather.periods
            .map(period => (<div className={styles.day} key={period.number}>{period.name}</div>));

        const weather = this.props.weather.periods
            .map(period => (<WeatherCell key={period.number} {...period} />));
        return (
            <div className={styles.row}>
                {topRow &&
                    <div className={styles.days}>
                        {days}
                    </div>
                }
                <div className={styles.place}>
                    <a target="_blank" href={getWeatherLinkPlus(lat, lon)}>[+]</a>
                    <a target="_blank" href={getWeatherLink(lat, lon)}>{name}</a>
                </div>
                {weather}
            </div>
        );
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        weather: state.weather.areas[ownProps.area.name],
        isFetching: state.weather.isFetching,
    };
};

const WeatherRow = connect(
  mapStateToProps
)(AreaRow);

export default WeatherRow;
