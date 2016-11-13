import React, {Component} from 'react'

class Character extends Component {
  render () {
    const { params: { id }, characters } = this.props
    return (
      <div>
        {JSON.stringify(characters.find(character => character._id === id))}
      </div>
    )
  }
}

export default Character
