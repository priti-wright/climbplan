import _ from 'lodash';
import React from 'react';
import styles from './SearchMap.scss';

const SearchMap = props => {
    const placePresent = ! _.isUndefined(props.place.id);
    const searchBoxClass = placePresent ? styles.searchBoxSearched : styles.searchBoxIntro;
    const mapCanvasClass = placePresent ? styles.mapCanvasSearched : styles.mapCanvasIntro;
    return (<div>
      <div className={searchBoxClass}>
        <input
          id="pac-input"
          className={styles.controls}
          type="text"
          placeholder='🔍    Search for a mountain!   (e.g. "Forbidden Peak")'
        />
      </div>
      <div className={mapCanvasClass} id="map-canvas" />
    </div>);
};

SearchMap.propTypes = {
    place: React.PropTypes.object,
};

export default SearchMap;
