
const actions = {
  'USER_FOUND': (payload, state) => ({ ...state, ...payload }),
  'USER_REMOVED': () => ({ loggedIn: false })
}

export default (state = { loggedIn: false }, {
  type,
  payload
}) => {
  return (actions[type] || (() => state))(payload, state)
}
