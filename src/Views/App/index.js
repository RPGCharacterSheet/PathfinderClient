import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Models from '../../Models'

import { createStore, combineReducers } from 'redux'
//import { Provider } from 'react-redux'
import { withRouter } from 'react-router'
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Auth from '../Auth'
import reducers from '../../Redux/reducers'

class App extends Component {
  static PropTypes = {
    router: Object,
    location: Object
  }
  
  constructor () {
    super()
    const store = createStore(
      combineReducers({
        ...reducers,
//        routing: routerReducer
      })
    )

    this.state = {
      store
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignUp(event) {

  }

  handleLogin (event) {
    event.preventDefault()
    const body = Array.from(new FormData(event.target))
      .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
    fetch('/User', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
    .then(res => {
      return res.ok
        ? res.json()
        : { ok: res.ok, text: res.statusText, status: res.statusText }
    })
    .then(json => Models[json._t](json))
    .then(user => {
      this.setState({ user })
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/characters')
      }
    })
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Pathfinder</h2>
          {this.state.user
            ? this.state.user.UserName
            : <Auth handleLogin={this.handleLogin} handleSignUp={this.handleSignUp} />}
        </div>
        {this.props.children && React.cloneElement(this.props.children, {
          characters: this.state.characters,
          charactersUpdate: (characters) => this.setState({ characters }),
          onCharacterSelect: (id) => this.props.router.replace(`/character/${id}`),
          user: this.state.user
        })}
      </div>
    )
  }
}

export default withRouter(App)
