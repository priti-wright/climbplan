import { connect } from 'react-redux'
import SearchBox from '../components/SearchBox'


const mapStateToProps = (state) => {
  return {
    matches: state.searchMatches,
    query: state.searchQuery
  }
}

const SearchBoxContainer = connect(
  mapStateToProps
)(SearchBox)

export default SearchBoxContainer;
