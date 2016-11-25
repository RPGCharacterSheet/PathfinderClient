const noop = () => {}
const actions = {
  'CHARACTERS_ADD': (state, payload) => state.concat(
      payload.filter(
        character => !state.find(
          old => old._id === character._id))),

  'CHARACTER_ADD': (state, payload) => [...state.all, payload],

  'UPDATE_CHARACTER': (state, payload) => state.map(character => {
    return (character._id === payload.selected)
      ? { ...character, ...payload.update }
      : character
  }),

  'UPDATE_CHARACTER_ABILITY': (state, payload) => state.map(character => {
    return (character._id === payload.selected)
      ? { ...character, AbilityScores: { ...character.AbilityScores,  ...payload.upate } }
      : character
  }),

  'CLEAR_USER': (state, payload) => []
}
export default (state = [], {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
