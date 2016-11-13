
const actions = {
}
export default (state = {}, {
  type,
  payload
}) => {
  return {}
  // return (actions[type] || (() => state || {}))(payload, state)
}
