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

const updateTypes = ['UPDATE_CHARACTER_ABILITY', 'UPDATE_CHARACTER']

const characterUpdate = store => next => action => {
  const a = next(action)

  if (updateTypes.indexOf(action.type) >= 0) {
    const { user, characters } = store.getState()
    const { payload: { selected } } = action
    const character = characters.find(c => c._id === selected)

    fetch('/Character/Edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user._id, character: { ...character, Owner: character.Owner } })
    })
  }
  return a
}


import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
export default [
  thunk,
  routerMiddleware(browserHistory),
  characterUpdate
]
