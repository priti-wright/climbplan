import React from 'react';

import WeatherRow from './AreaRow';


const WeatherTable = props => {
    const weatherMountains = props.areas
        .map((mountain, index) => (<WeatherRow key={mountain.name} area={mountain} topRow={index == 0}/>));
    return (
        <table>
            <tbody>
                {weatherMountains}
            </tbody>
        </table>
    );
};

export default WeatherTable;
