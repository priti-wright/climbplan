import React from 'react';

import ResultBox from './ResultBox';


const WeatherPanel = props => {
    const widgetUrl = `http://forecast.io/embed/#lat=${props.place.lat}&lon=${props.place.lon}&name=${props.place.name}`;
    return (
        <ResultBox title="Weather">
            <iframe
                id="forecast_embed"
                type="text/html"
                frameBorder="0"
                height="240"
                width="100%"
                src={widgetUrl}
                key={widgetUrl}
            />
        </ResultBox>
    );
};

WeatherPanel.propTypes = {
    place: React.PropTypes.shape({
        lat: React.PropTypes.number,
        lon: React.PropTypes.number,
        name: React.PropTypes.string,
    }).isRequired,
};

export default WeatherPanel;
