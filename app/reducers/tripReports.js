const tripReports = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TRIP_REPORTS':
      return action.tripReports
    default:
      return state
}

export default tripReports
