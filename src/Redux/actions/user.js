import Models from '../../Models'
const { UserModel } = Models
import 'whatwg-fetch'

import { push } from 'react-router-redux'

export function userFound (user) {
  return {
    type: 'USER_FOUND',
    payload: user
  }
}


export function handleSignUp (event) {
  event.preventDefault()
  return (dispatch, getState) => {

  }
}

export function updateCharacters (characters) {
  return {
    type: 'CHARACTER_UPDATE',
    payload: characters
  }
}

export function handleLogin (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const body = Array.from(new FormData(event.target))
      .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
    fetch('/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => new UserModel(json))
    .then((user) => { userFound(user); return user })
    .then((user) => fetch(`/Character?user=${user._id}`))
    .then(res => res.json())
    .then(characters => dispatch(updateCharacters(characters)))
    .then(() => dispatch(push('/character')))
  }
}
