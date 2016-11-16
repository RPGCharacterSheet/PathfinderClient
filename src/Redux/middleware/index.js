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
  const a = next(action)

  if (action.type === 'UPDATE_CHARACTER') {
    const { user, characters: { all, selected } } = store.getState()
    const character = all.find(c => c._id === selected)

    fetch('/Character/Edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user._id, character: { ...character, Owner: character.Owner['$oid'] } })
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
