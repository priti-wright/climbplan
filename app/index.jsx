// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base.scss';

import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import {
    Route,
    Router,
} from 'react-router';
import {initGA} from './ga.js';

import reducers from './reducers';
import SearchPage from './containers/SearchPage';
import {setQueryAndPlaceFromUrlIfNeeded} from './actions/searchQuery';

// not sure why the tmpl.html bootstrap doesn't work; let's just bootstrap ourselves in anyway
document.body.innerHTML += '\
    <title>Climb Plan</title>\
        <div id="target-summary"></div>\
        <div id="research-title"></div>\
        <div id="research-suggestions"></div>\
        <div id="footer"></div>\
        <div id="app"></div>';

initGA();


const history = createHashHistory({
    queryKey: false,
});

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, {}, window.devToolsExtension && window.devToolsExtension());


const getFetchPlace = dispatch => {
    return nextRouterState => {
        const {placeName, placeLat, placeLon} = nextRouterState.params;
        dispatch(
            setQueryAndPlaceFromUrlIfNeeded(placeName, placeLat, placeLon)
        );
    };
};


const SiteRouter = props => (
    <Router history={history}>
        <Route path="/" component={SearchPage} />
        <Route
            path="search/:placeName/:placeLat/:placeLon"
            component={SearchPage}
            onEnter={getFetchPlace(props.dispatch)}
        />
    </Router>
);

SiteRouter.propTypes = {dispatch: React.PropTypes.function};

const SiteRouterContainer = connect()(SiteRouter);

const App = (
  <Provider store={store}>
    <SiteRouterContainer />
  </Provider>
);


ReactDOM.render(
  App,
  document.getElementById('app')
);
