import { push } from 'react-router-redux'

export function onCharacterSelect (id) {
  return dispatch => {
    dispatch(setCharacter(id))
    dispatch(push(`/character/${id}`))
  }
}

export function setCharacter (id) {
  return {
    type: 'CHARACTER_SELECT',
    payload: id
  }
}

export function updateCharacter (selected, update) {
  return {
    type: 'UPDATE_CHARACTER',
    payload: {
      selected,
      update: update
    }
  }
}

export function updateCharacterAbility (selected, update) {
  return {
    type: 'UPDATE_CHARACTER_ABILITY',
    payload: {
      selected,
      update: Object.keys(update).reduce((obj, key) => Object.assign({}, { [key.split('.')[1]]: update[key] }), {})
    }
  }
}
