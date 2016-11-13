
const actions = {
  'USER_FOUND': (payload, state) => ({ ...state, ...payload }),
  'USER_REMOVED': () => {}
}
export default (state = {}, {
  type,
  payload
}) => {
  return (actions[type] || (() => state || {}))(payload, state)
}
