import React from 'react';

import {fetchWeather} from '../actions/weather';
import styles from './WeatherPanel.scss';
import baseStyles from '../css/base.scss';

const WeatherDay = props => {
    console.log('styles')
    console.log(styles)
    return (
        <div className={styles.weatherDay}>
            <h2>{props.day_of_week}</h2>
            <p>{props.temperature}°F ({props.temperature_label})</p>
            <p>{props.weather_summary}</p>
        </div>
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
        const weatherDays = this.props.weather.slice(0, 6).map(weatherDay => {
            return <WeatherDay {...weatherDay} key={weatherDay.day_of_week} />;
        });

        return (
            <div className={baseStyles.resultPanel}>
                <h1 className={baseStyles.sectionTitle}>Weather</h1>
                <div className={baseStyles.weather}>{weatherDays}</div>
            </div>
        );
    },
});
