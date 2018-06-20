import React from 'react';

import styles from './WeatherCell.scss';


function parseWind(wind) {
    const words = wind.split(' ');
    if(words.length == 4) {
        return (parseInt(words[0]) + parseInt(words[2])) / 2;
    }
    else
        return parseInt(words[0]);
}

function parsePrecip(forecastDetails) {
    const details = forecastDetails.toLowerCase();
    if(details.match(/(little or no .+ accumulation expected)/g)) {
        return .01;
    }
    const words = details.split('accumulation of');
    if (details.match(/( .+ accumulation of)/g) || details.includes('inch')) {
        if (details.includes('less than')) {
            if (details.includes('tenth of an inch') || details.includes('half inch'))
                return '<.1';
            if (details.includes('half an inch') || details.includes('half inch'))
                return '<½';
            if (details.includes('one inch'))
                return '<1';
        }
        else if (details.includes('inches')) {
            const inches = details.match(/(\d+)( to )(\d+)( inches)/i);
            return (parseInt(inches[1]) + parseInt(inches[3])) / 2;
        }
        return words[1];
    }
    // not tested 
    if (details.match(/(amounts between a.+ )(.+ )( and )(.+ )( of an inch)/g)) {
        const inches = details.match(/(amounts between a.+ )(.+ )( and )(.+ )( of an inch)/i);
        const precip_amount = inches[4];
        if (precip_amount == 'tenth')
            return '<.1';
        if (precip_amount == 'quarter')
            return '<¼';
        if (precip_amount == 'half')
            return '<½';
        if (precip_amount == 'three quarters')
            return '<¾';
        if (precip_amount == 'one')
            return '<1';
    }
    if (details.includes('rain')) {
        try {
            return details.match(/(a )*(.+ )(of .+ showers)/i)[2];
        } catch (e) {}
        return details;
    }
    if (details.includes('showers')) {
        try {
            return details.match(/(a )*(.+ )(of .+ showers)/i)[2];
        } catch (e) {}
        return details;
    }
    if (details.includes('cloudy')) {
        return details.match(/(.+ cloudy)/g);
    }
    else if (details.includes('clear') || details.includes('sunny')) {
        return 0;
    }
    return details;
}

const WeatherCell = React.createClass({
    render() {
        const precip = parsePrecip(this.props.detailedForecast)
        const flag = parseFloat(precip) > 1;
        const wind = parseWind(this.props.windSpeed);
        return (
            <td className={styles.span}>
                <img src={this.props.icon} className={styles.weatherIcon} />
                <div className={styles.precip} style={{color: flag ? '#f00' : '#000'}}>{precip}</div>
                
                <div className={styles.windspeed} style={{color: wind > 15 ? '#f00' : '#000'}}>{wind}</div>
            </td>
        );
    },
});

export default WeatherCell;
