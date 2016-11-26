const noop = () => {}

const UI = [
  {
    title: 'Name',
    styles: { border: '2px solid black' },
    content: '$Name'
  },
  {
    title: 'Abilities',
    styles: { border: '2px solid blue' },
    content: [
      {
        title: 'Strength',
        content: [
          '$AbilityScores.Strength',
          '$AbilityModifiers.Strength'
        ]
      }
    ]
  }
]

const actions = {
  'USER_FOUND': (state, payload) => ({ ...state, ...payload, loggedIn: true }),
  'CLEAR_USER': () => ({ loggedIn: false, UI })
}

export default (state = { loggedIn: false, UI }, {
  type,
  payload
}) => (actions[type] || noop)(state, payload) || state
