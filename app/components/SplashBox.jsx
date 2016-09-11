import React from 'react';

import SearchBox from '../containers/SearchBox';
import styles from './SplashBox.scss';


const SplashBox = () => (
    <div className={styles.splashBox} >
        <h1>ClimbPlan</h1>
        <subtitle>Research your next climb</subtitle>
        <br />
        <SearchBox
            className={styles.searchBox}
            autoFocus
        />
    </div>
);


export default SplashBox;
