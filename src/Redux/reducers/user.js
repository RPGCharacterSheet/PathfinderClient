const noop = () => {}

const actions = {
  'USER_FOUND': (state, payload) => ({ ...state, ...payload, loggedIn: true }),
  'USER_REMOVED': () => ({ loggedIn: false })
}

export default (state = { loggedIn: false }, {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
