import { connect } from 'react-redux'
import SearchBox from '../components/SearchBox'


const mapStateToProps = (state) => {
  return {
    placePresent: Boolean(state.place.id),
    matches: state.searchMatches,
    query: state.searchQuery
  }
}

const SearchBoxContainer = connect(
  mapStateToProps
)(SearchBox)

export default SearchBoxContainer;
