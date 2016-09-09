import React from 'react';

import SearchBox from '../containers/SearchBox';
import ResultBox from './ResultBox.jsx';
import styles from './SplashBox.scss';


const SplashBox = props => <ResultBox>
    <title>ClimbPlan</title>
    <SearchBox />
</ResultBox>;


export default SplashBox;
