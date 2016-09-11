import React from 'react';
import {History} from 'react-router';
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';


import {fetchSearchMatches} from '../actions/searchMatches';
import {receivePlace} from '../actions/place';
import {receiveQuery} from '../actions/searchQuery';
import styles from './SearchMap.scss';
import searchBoxStyles from './SearchBox.scss';


const queryUpdated = (value, dispatch) => {
    dispatch(receiveQuery(value));
    dispatch(fetchSearchMatches(value));
};


const renderAutocompleteMenu = (items, value) => {
    if (items.length) {
        return <div className={searchBoxStyles.menu} children={items} />;
    }
    return <span />;
};


const searchBox = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        params: React.PropTypes.object, // Not present when we're on the intro page (nothing searched yet)
        place: React.PropTypes.object.isRequired,
        matches: React.PropTypes.array.isRequired,
        query: React.PropTypes.string.isRequired,
        className: React.PropTypes.string.isRequired,
        autoFocus: React.PropTypes.bool,
    },
    mixins: [History],
    defaultProps: {
        autoFocus: false,
    },
    componentWillReceiveProps(nextProps) {
        const {place} = nextProps;
        if (place.id && (_.get(this.props, 'params.placeId') !== place.id)) {
            this.history.pushState(null, `/search/${encodeURIComponent(place.name)}/${place.lat}/${place.lon}`);
        }
    },
    render() {
        const {autoFocus, className, dispatch, matches, query} = this.props;
        return (
            <div className={className}>
                <Autocomplete
                    inputProps={{
                        name: 'Mountain Search',
                        className: styles.controls,
                        type: 'text',
                        placeholder: '🔍    Search for a mountain!   (e.g. "Forbidden Peak")',
                        autoFocus,
                    }}
                    wrapperProps={{className: searchBoxStyles.wrapper}}
                    value={query}
                    items={matches}
                    onChange={(event, newText) => queryUpdated(newText, dispatch)}
                    onSelect={(event, selectedPlace) => {
                        dispatch(receiveQuery(selectedPlace.name));
                        dispatch(receivePlace(selectedPlace));
                    }}
                    getItemValue={item => item.name}
                    renderItem={(item, isHighlighted) => (
                        <div
                            className={isHighlighted ? styles.selected : styles.deselected}
                            style={{height: '3em', padding: '1em'}}
                            key={item.id}
                            id={item.name}
                        >{item.name} <small>{item.areaName}</small></div>
                    )}
                    renderMenu={renderAutocompleteMenu}
                />
            </div>
        );
    },
});


export default searchBox;
