import React, {Component} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'
class Character extends Component {
  render () {
    const { character } = this.props
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

export default connect(
  state => ({
    character: state.characters.selected
  }),
  actions
)(Character)
