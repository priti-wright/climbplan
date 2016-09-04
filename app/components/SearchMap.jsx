import _ from 'lodash';
import React from 'react';

const SearchMap = props => {
    const placePresent = ! _.isUndefined(props.place.id);
    const mapCanvasClass = placePresent ? 'map-canvas-searched' : 'map-canvas-intro';
    return (<div>
      <div className={mapCanvasClass} id="map-canvas" />
    </div>);
};

SearchMap.propTypes = {
    place: React.PropTypes.object,
};

export default SearchMap;
