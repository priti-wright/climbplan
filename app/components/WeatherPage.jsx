import React from 'react';

import styles from './WeatherPage.scss';
import Section from './widgets/Section';
import WeatherTable from './weather/WeatherTable';

import {MOUNTAINS, CRAGS, PASSES} from '../standardPlaces';


const WeatherAccordion = props => {
    return (
        <div className={styles.accordion}>
            <div className={styles.title}>{props.title}</div>
            <Section title="Mountains">
                <WeatherTable areas={MOUNTAINS} />
            </Section>
            <Section title="Cragging">
                <WeatherTable areas={CRAGS} />
            </Section>
            <Section title="Passes">
                <WeatherTable areas={PASSES} />
            </Section>
        </div>
    );
};

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
