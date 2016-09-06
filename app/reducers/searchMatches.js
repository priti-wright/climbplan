import {REQUEST_SEARCH_MATCHES, RECEIVE_SEARCH_MATCHES} from '../actions/searchMatches'

const searchMatches = (state = [], action) => {
  switch (action.type) {
    case REQUEST_SEARCH_MATCHES:
      return []
    case RECEIVE_SEARCH_MATCHES:
      return action.searchMatches
    default:
      return state
    }
}

export default searchMatches;
