import React from 'react'
import ReactDOM from 'react-dom'
import App from './Views/App'
import Character from './Views/Character'
import Characters from './Views/Characters'
import './index.css'

import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import middleware, { loadState, saveState } from './Redux/middleware'

import reducers from './Redux/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  loadState(),
  composeEnhancers(applyMiddleware(...middleware))
)

store.subscribe(() => saveState(store.getState()))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
      <Route path='/character' component={Characters}>
        <Route path='/character/:id' component={Character} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
