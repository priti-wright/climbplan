import React from 'react';

import styles from './WeatherPage.scss';
import Section from './widgets/Section';
import WeatherRow from './weather/AreaRow';
import WeatherTable from './weather/WeatherTable';

import {MOUNTAINS, CRAGS, PASSES} from '../standardPlaces';


var WeatherAccordion = React.createClass({
  render: function() {
    const weatherCrags = CRAGS
        .map((mountain, index) => (<WeatherRow key={mountain.name} area={mountain} topRow={index == 0}/>));
    const weatherPasses = PASSES
        .map((mountain, index) => (<WeatherRow key={mountain.name} area={mountain} topRow={index == 0}/>));
    return (
      <div className={styles.accordion}>
        <div className={styles.title}>{this.props.title}</div>
        <Section title="Mountains">
            <WeatherTable areas={MOUNTAINS} />
        </Section>
        <Section title="Cragging">
            {weatherCrags}
        </Section>
        <Section title="Passes">
            {weatherPasses}
        </Section>
      </div>
    );
  }
});


const WeatherPage = React.createClass({
    componentDidMount() {
        document.title = `Weather - ClimbPlan`;
    },
    render() {
        return (
            <WeatherAccordion title="Weather Areas" />
        );
    },
});

export default WeatherPage;
