import _ from 'lodash';
import React from 'react';
import styles from './SearchMap.scss';

const SearchMap = props => {
    const placePresent = ! _.isUndefined(props.place.id);
    const mapCanvasClass = placePresent ? styles.mapCanvasSearched : styles.mapCanvasIntro;
    return (<div>
      <div className={mapCanvasClass} id="map-canvas" />
    </div>);
};

SearchMap.propTypes = {
    place: React.PropTypes.object,
};

export default SearchMap;
