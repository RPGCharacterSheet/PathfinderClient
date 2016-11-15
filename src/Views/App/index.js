import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import * as actions from '../../Redux/actions'

import { connect } from 'react-redux'

import Auth from '../Auth'

class App extends Component {

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Pathfinder</h2>
          <span>
            {
              this.props.user.loggedIn
                ? `Hello ${this.props.user.UserName}!`
                : <Auth handleLogin={this.props.handleLogin} handleSignUp={this.props.handleSignUp} />
            }
          </span>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    characters: state.characters
  }),
  actions
)(App)
