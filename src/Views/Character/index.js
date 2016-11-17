import React, {Component, PropTypes} from 'react'

import './character.css'

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
            onChange={(Name) => this.props.updateCharacter({ Name })}
          />
        </h1>
        <h2>
          Abilities
        </h2>
        <div className='abilities'>
          {
            Object.keys(character.AbilityScores).map(ability => (
              <div key={ability} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <span>{ability}</span>
                <input
                  style={{width: '40px'}}
                  type='number'
                  value={character.AbilityScores[ability]}
                  onChange={({ target: { value } }) => this.props.updateCharacterAbility({ [ability]: value })}
                />
                <span className='character-modifier' style={{width: '40px'}}>
                  {character.AbilityModifiers[ability]}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
Character.propTypes = {
  character: PropTypes.object,
  updateCharacter: PropTypes.func,
  updateCharacterAbility: PropTypes.func
}

export default connect(
  state => ({
    character: state.characters.all.find(character => character._id === state.characters.selected)
  }),
  actions
)(Character)
