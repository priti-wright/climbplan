import React from 'react';
import Autocomplete from 'react-autocomplete';


import {fetchSearchMatches} from '../actions/searchMatches';
import {receiveQuery} from '../actions/searchQuery';

const queryUpdated = (value, dispatch) => {
    dispatch(receiveQuery(value));
    dispatch(fetchSearchMatches(value));
}



const searchBox = props => {
  return <Autocomplete
      inputProps={{
        name: 'Mountain Search',
        className: 'controls',
        type:'text',
        placeholder:'🔍    Search for a mountain!   (e.g. "Forbidden Peak")',
      }}
      wrapperProps={{className:'search-box-intro'}}
      value={props.query}
      items={props.matches}
      onChange={(event, value) => queryUpdated(value, props.dispatch)}
      onSelect={(event, value) => {
        props.dispatch(receiveQuery(value.name));
        console.log('selected', value);
      }}
      getItemValue={(item) => item.name}
      renderItem={(item, isHighlighted) => (
        <div
          className={isHighlighted ? 'selected' : 'deselected'}
          style={{height:'3em', 'padding': '1em'}}
          key={item.id}
          id={item.name}
        >{item.name} <small>{item.areaName}</small></div>
      )}
  />
}

searchBox.propTypes = {
  query: React.PropTypes.string,
  matches: React.PropTypes.array
};

export default searchBox;
