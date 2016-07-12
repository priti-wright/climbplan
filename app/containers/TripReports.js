import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TripReports'

const getTripReports = (tripReports) => {
    return tripReports
}

const mapStateToProps = (state) => {
  return {
    TripReports: getTripReports(state.tripReports)
  }
}

const TripReports = connect(
  mapStateToProps
)(TripReports)

export default TripReports;
