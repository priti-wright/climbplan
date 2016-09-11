import React from 'react';
import {History} from 'react-router';

import SearchBox from '../containers/SearchBox';
import SearchMap from '../containers/SearchMap';
import ResultPanel from '../containers/ResultPanel';
import styles from './SearchMap.scss';


const ResultsPage = React.createClass({
    propTypes: {
        params: React.PropTypes.object,
    },
    mixins: [History],
    componentDidMount() {
        const placeName = this.props.params.placeName;
        document.title = `${placeName} - ClimbPlan`;
    },
    render() {
        return (
            <div>
              <SearchBox className={styles.searchBoxSearched} />
              <SearchMap className={styles.mapCanvasSearched} onResultPage />
              <ResultPanel />
            </div>
        );
    },
});

export default ResultsPage;
