import React from 'react';
import _ from 'lodash';

import TripReportResults from '../containers/TripReports';
import ResearchSuggestions from './ResearchSuggestions';
import WeatherPanel from '../containers/WeatherPanel';
import styles from './ResultPanel.scss';


const FeedbackMessage = () => {
    return (
        <p>
        Thanks for playing!
        Drop us some <a href="https://docs.google.com/document/d/1s91RrNYWmucPVacHv7GkcTUHQmXTvpcIk0xGPHxJZ3A/edit?usp=sharing" target="_new">feedback</a>!
        </p>
    );
};

const ResultPanel = props => {
    const content = _.isUndefined(props.place.id) ?
        null :
        <div>
            <div className={styles.mainContent}>
                <ResearchSuggestions place={props.place} />
                <WeatherPanel />
                <TripReportResults />
            </div>
            <FeedbackMessage />
        </div>;

    return <div>{content}</div>;
};

ResultPanel.propTypes = {
    place: React.PropTypes.object,
};

export default ResultPanel;
