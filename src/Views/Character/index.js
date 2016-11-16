import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'

import ChangableInput from './ChangableInput'

import Models from '../../Models'
class Character extends Component {
  render () {
    const character = new Models.Character(this.props.character)
    return (
      <div>
        <h1>
          <ChangableInput
            label='Name'
            value={character.Name}
            onChange={(event) => this.props.updateCharacter({ Name: event.target.value })}
          />
        </h1>
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
Character.propTypes = {
  character: PropTypes.object,
  updateCharacter: PropTypes.func
}

export default connect(
  state => ({
    character: state.characters.all.find(character => character._id === state.characters.selected)
  }),
  actions
)(Character)
