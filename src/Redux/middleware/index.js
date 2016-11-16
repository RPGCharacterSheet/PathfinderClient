export function loadState () {
  try {
    const stateSerialized = localStorage.getItem('state')
    if (stateSerialized === null) {
      return undefined
    }
    return JSON.parse(stateSerialized)
  } catch (err) {
    return undefined
  }
}

export function saveState (state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // ignore error
    console.error(err)
  }
}

const characterUpdate = store => next => action => {
  if (action.type === 'CHARACTER_UPDATE') {
    const { user, characters: { selected } } = next(action)
    fetch('/Character/Edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ character: selected, user })
    })
  }
  return next(action)
}


import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
export default [
  thunk,
  routerMiddleware(browserHistory),
  characterUpdate
]
