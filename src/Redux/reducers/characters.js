
const actions = {
  CHARACTER_UPDATE: (payload, state) => state.concat(payload.filter(character => !state.find(old => old._id === character._id)))
}
export default (state = [], {
  type,
  payload
}) => {
  return (actions[type] || (() => state || {}))(payload, state)
}
