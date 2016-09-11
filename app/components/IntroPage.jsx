import React from 'react';

import SplashBox from '../components/SplashBox';
import SearchMap from '../containers/SearchMap';
import styles from './IntroPage.scss';
import searchMapStyles from './SearchMap.scss';


const IntroPage = React.createClass({
    componentDidMount() {
        document.title = 'ClimbPlan';
    },
    render() {
        return (
            <div>
                <SplashBox />
                <SearchMap onResultPage={false} className={searchMapStyles.mapCanvasIntro} />
            </div>
        );
    },
});

export default IntroPage;
