import {connect} from 'react-redux';
import SearchMap from '../components/SearchMap';


const mapStateToProps = (state, ownProps) => {
    return {
        place: state.place,
        className: ownProps.className,
    };
};

const SearchMapContainer = connect(
  mapStateToProps
)(SearchMap);

export default SearchMapContainer;
