import React, {Component} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'

import Models from '../../Models'
class Character extends Component {
  render () {
    const character = new Models.Character(this.props.character)
    return (
      <div>
        <h1>{character.Name}</h1>
        <div className='abilities'>
          {Object.keys(character.AbilityScores).map(ability => (
            <div key={ability}>
              <p>{ability}</p>
              <p>Score: {character.AbilityScores[ability]}</p>
              <p>Modifier: {character.AbilityModifiers[ability]}</p>
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
