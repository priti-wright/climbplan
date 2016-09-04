import React from 'react';

import {fetchWeather} from '../actions/weather';
import styles from './WeatherPanel.css';

const WeatherDay = props => {
    console.log('styles')
    console.log(styles)
    return (
        <li>
            <div className={styles.day}>{props.day_of_week}</div>
            <div>Temperature: {props.temperature} ({props.temperature_label})</div>
            <div>{props.weather_summary}</div>
            <br />
        </li>
    );
};

WeatherDay.propTypes = {
    day_of_week: React.PropTypes.string.isRequired,
    temperature: React.PropTypes.string.isRequired,
    temperature_label: React.PropTypes.string.isRequired,
    weather_summary: React.PropTypes.string.isRequired,
};


export const WeatherPanel = React.createClass({
    propTypes: {
        weather: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        place: React.PropTypes.object,
        isFetching: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
    },
    componentWillMount() {
        this.props.dispatch(fetchWeather(this.props.place));
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.place.id !== nextProps.place.id) {
            this.props.dispatch(fetchWeather(this.props.place));
        }
    },
    render() {
        const weatherDays = this.props.weather.slice(0, 10).map(weatherDay => {
            return <WeatherDay {...weatherDay} key={weatherDay.day_of_week} />;
        });

        return (
            <div className="trip-reports">
                <h1 className="section-title">Weather</h1>
                <ul className="trip-reports-info">{weatherDays}</ul>
            </div>
        );
    },
});
