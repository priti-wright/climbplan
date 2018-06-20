import {connect} from 'react-redux';
import React from 'react';

import WeatherRow, {HeaderRow} from './WeatherRow';


const WeatherTable = props => {
    const weatherMountains = props.areas
        .map((mountain, index) => (<WeatherRow key={mountain.name} area={mountain} topRow={index == 0} />));
    return (
        <table>
            <thead>
                <HeaderRow periods={props.periods} />
            </thead>
            <tbody>
                {weatherMountains}
            </tbody>
        </table>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        periods: state.weather.periods,
        isFetching: state.weather.isFetching,
        ...ownProps,
    };
};

export default connect(
  mapStateToProps
)(WeatherTable);

