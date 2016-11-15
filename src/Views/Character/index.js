import React, {Component} from 'react'

class Character extends Component {
  render () {
    const { params: { id }, characters } = this.props
    const character = characters.find(character => character._id === id)
    return (
      <div>
        <h1>{character.Name}</h1>
        <div className='abilities'>
          {Object.keys(character.AbilityScores).map(ability => (
            <div key={ability}>
              <p>{ability}</p>
              <p>Score: {character.AbilityScores[ability].Score}</p>
              <p>Modifier: {character.AbilityScores[ability].Ability}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Character
