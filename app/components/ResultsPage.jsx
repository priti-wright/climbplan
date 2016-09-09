import React from 'react';
import SearchBox from '../containers/SearchBox';
import SearchMap from '../containers/SearchMap';
import ResultPanel from '../containers/ResultPanel';

const ResultsPage = () => (
    <div>
      <SearchMap />
      <SearchBox />
      <ResultPanel />
    </div>
);

export default ResultsPage;
