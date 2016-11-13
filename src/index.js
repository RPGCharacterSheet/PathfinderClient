import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './Views/App'
import Character from './Views/Character'
import Characters from './Views/Characters'
import './index.css'

import { Router, Route, browserHistory } from 'react-router'

class Page extends Component {

  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='/characters' component={Characters} />
          <Route path='/character/:id' component={Character} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
