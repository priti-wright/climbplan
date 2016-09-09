import React from 'react';
import SearchBox from '../containers/SearchBox';
import SearchMap from '../containers/SearchMap';
import ResultPanel from '../containers/ResultPanel';
import styles from './SearchMap.scss';


const ResultsPage = () => (
    <div>
      <SearchBox className={styles.searchBoxSearched} />
      <SearchMap className={styles.mapCanvasSearched} onResultPage />
      <ResultPanel />
    </div>
);

export default ResultsPage;
