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

export function updateCharacters (characters) {
  return {
    type: 'CHARACTERS_ADD',
    payload: characters
  }
}

function getUser (url, event) {
  return (dispatch, getState) => {
    const body = Array.from(new FormData(event.target))
      .reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => new UserModel(json))
    .then((user) => { dispatch(userFound(user)); return user })
    .then((user) => fetch(`/Character?user=${user._id}`))
    .then(res => res.json())
    .then(characters => characters.map(char => ({ ...char, _id: char._id['$oid'] })))
    .then(characters => dispatch(updateCharacters(characters)))
    .then(() => dispatch(push('/character')))
  }
}

export function handleSignUp (event) {
  event.preventDefault()
  return getUser('/User/Create', event)
}

export function handleLogin (event) {
  event.preventDefault()
  return getUser('/User', event)
}
