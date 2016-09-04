import _ from 'lodash';
import React from 'react';

const SearchMap = props => {
    const placePresent = ! _.isUndefined(props.place.id);
    const searchBoxClass = placePresent ? 'search-box-searched' : 'search-box-intro';
    const mapCanvasClass = placePresent ? 'map-canvas-searched' : 'map-canvas-intro';
    return (<div>
      <div className={searchBoxClass}>
        <input
          id="pac-input"
          className="controls"
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
