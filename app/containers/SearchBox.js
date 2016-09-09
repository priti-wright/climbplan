import {connect} from 'react-redux';
import SearchBox from '../components/SearchBox';


const mapStateToProps = (state, ownProps) => {
    return {
        autoFocus: ownProps.autoFocus,
        place: state.place,
        matches: state.searchMatches,
        query: state.searchQuery,
        className: ownProps.className,
    };
};

const SearchBoxContainer = connect(
  mapStateToProps
)(SearchBox);

export default SearchBoxContainer;
