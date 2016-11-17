const noop = () => {}
const actions = {
  'CHARACTERS_ADD': (state, payload) => ({
    ...state,
    all: state.all.concat(
      payload.filter(
        character => !state.all.find(
          old => old._id === character._id)))
  }),
  'CHARCTER_ADD': (state, payload) => ({ ...state, all: [...state.all, payload] }),
  'CHARACTER_SELECT': (state, payload) => ({ ...state, selected: payload }),
  'UPDATE_CHARACTER': (state, payload) => ({
    ...state,
    all: state.all.map(character => {
      return (character._id === state.selected)
        ? { ...character, ...payload }
        : character
    })
  }),
  'UPDATE_CHARACTER_ABILITY': (state, payload) => ({
    ...state,
    all: state.all.map(character => {
      return (character._id === state.selected)
        ? { ...character, AbilityScores: { ...character.AbilityScores,  ...payload } }
        : character
    })
  })
}
export default (state = { all: [], selected: 0 }, {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
