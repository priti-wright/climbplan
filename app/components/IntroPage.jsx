import React from 'react';

import SearchBox from '../containers/SearchBox';
import SearchMap from '../containers/SearchMap';
import styles from './SearchMap.scss';


const IntroPage = React.createClass({
    componentDidMount() {
        document.title = 'ClimbPlan';
    },
    render() {
        return (
            <div>
              <SearchBox className={styles.searchBoxIntro} autoFocus />
              <SearchMap onResultPage={false} className={styles.mapCanvasIntro} />
            </div>
        );
    },
});

export default IntroPage;
