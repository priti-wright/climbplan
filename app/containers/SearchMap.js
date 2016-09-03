import { connect } from 'react-redux'
import SearchMap from '../components/SearchMap'


const mapStateToProps = (state) => {
  return {
    place: state.place
  }
}

const SearchMapContainer = connect(
  mapStateToProps
)(SearchMap)

export default SearchMapContainer;
