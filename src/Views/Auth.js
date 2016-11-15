import React, { Component, PropTypes } from 'react'

class Auth extends Component {
  static propTypes = {
    handleLogin: PropTypes.func,
    handleSignUp: PropTypes.func
  }

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleLogin}>
          <input type='text' name='userName' />
          <input type='password' name='password' />
          <input type='submit' value='Login' />
        </form>
        <form onSubmit={this.props.handleSignUp}>
          <input type='text' name='userName' />
          <input type='password' name='password' />
          <input type='submit' value='SignUp' />
        </form>
      </div>
    )
  }
}

export default Auth