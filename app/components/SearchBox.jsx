import React from 'react';
import Autocomplete from 'react-autocomplete';


import {fetchSearchMatches} from '../actions/searchMatches';
import {receivePlace} from '../actions/place';
import {receiveQuery} from '../actions/searchQuery';
import styles from './SearchMap.scss';

const queryUpdated = (value, dispatch) => {
    dispatch(receiveQuery(value));
    dispatch(fetchSearchMatches(value));
}


const searchBox = props => {
  const searchBoxClass = props.placePresent ? styles.searchBoxSearched : styles.searchBoxIntro;
  return <Autocomplete
      inputProps={{
        name: 'Mountain Search',
        className: styles.controls,
        type:'text',
        placeholder:'🔍    Search for a mountain!   (e.g. "Forbidden Peak")',
        autoFocus: true,
      }}
      wrapperProps={{className:searchBoxClass}}
      value={props.query}
      items={props.matches}
      onChange={(event, value) => queryUpdated(value, props.dispatch)}
      onSelect={(event, value) => {
        props.dispatch(receiveQuery(value.name));
        props.dispatch(receivePlace(value));
        console.log('selected', value);
      }}
      getItemValue={(item) => item.name}
      renderItem={(item, isHighlighted) => (
        <div
          className={isHighlighted ? styles.selected : styles.deselected}
          style={{height:'3em', 'padding': '1em'}}
          key={item.id}
          id={item.name}
        >{item.name} <small>{item.areaName}</small></div>
      )}
  />
}

searchBox.propTypes = {
  placePresent: React.PropTypes.bool,
  matches: React.PropTypes.array,
  query: React.PropTypes.string,
};

export default searchBox;
