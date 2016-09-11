// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base.scss';

import 'babel-polyfill';

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
import IntroPage from './components/IntroPage';
import ResultsPage from './components/ResultsPage';
import {setQueryAndPlaceFromUrlIfNeeded} from './actions/searchQuery';

// not sure why the tmpl.html bootstrap doesn't work; let's just bootstrap ourselves in anyway
document.body.innerHTML += '<div id="app"></div>';

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
        <Route path="/" component={IntroPage} />
        <Route
            path="search/:placeName/:placeLat/:placeLon"
            component={ResultsPage}
            onEnter={getFetchPlace(props.dispatch)}
        />
    </Router>
);

SiteRouter.propTypes = {dispatch: React.PropTypes.func};

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
