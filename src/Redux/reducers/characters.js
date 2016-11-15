const noop = () => {}
const actions = {
  'CHARACTER_UPDATE': (state, payload) => ({
    ...state,
    all: state.all.concat(
      payload.filter(
        character => !state.all.find(
          old => old._id === character._id)))
  }),
  'CHARACTER_SELECT': (state, payload) => ({ ...state, selected: state.all.find(c => c._id === payload) })

}
export default (state = { all: [], selected: null }, {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
