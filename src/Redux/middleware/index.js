export function loadState () {
  try {
    const stateSerialized = localStorage.getItem('state')
    if (stateSerialized === null) {
      return undefined
    }
    return JSON.parse(stateSerialized)
  } catch (err) {
    return undefined
  }
}

export function saveState (state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // ignore error
    console.error(err)
  }
}
