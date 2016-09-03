import { connect } from 'react-redux'
import SearchPage from '../components/SearchPage'


const mapStateToProps = (state) => {
  return {
    place: state.place
  }
}

const SearchPageContainer = connect(
  mapStateToProps
)(SearchPage)

export default SearchPageContainer;
