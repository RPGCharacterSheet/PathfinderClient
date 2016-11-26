const noop = () => {}

const actions = {
  'USER_FOUND': (state, payload) => ({ ...state, ...payload, loggedIn: true }),
  'CLEAR_USER': () => ({ loggedIn: false })
}

export default (state = { loggedIn: false }, {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
