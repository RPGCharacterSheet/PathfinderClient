import React, {Component, PropTypes} from 'react'

import './character.css'

import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'

import ChangableInput from './ChangableInput'

import Models from '../../Models'
class Character extends Component {
  render () {
    const selected = this.props.routeParams.id
    const character = new Models.Character(this.props.characters.find(ch => ch._id === selected))
    return (
      <div>
        <h1>
          <ChangableInput
            label='Name'
            value={character.Name}
            onChange={(Name) => this.props.updateCharacter(selected, { Name })}
          />
        </h1>
        <h2 style={{textAlign: 'center'}}>
          Abilities
        </h2>
        <div className='abilities'>
          {
            Object.keys(character.AbilityScores).map(ability => (
              <div key={ability} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <span>{ability}</span>
                <input
                  style={{width: '100%', margin: '6px 0px', textAlign: 'center'}}
                  type='number'
                  value={character.AbilityScores[ability]}
                  onChange={({ target: { value } }) => this.props.updateCharacterAbility(selected, { [ability]: value })}
                />
                <span className='character-modifier' style={{width: '100%', textAlign: 'center'}}>
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
  updateCharacterAbility: PropTypes.func,
  updateCharacter: PropTypes.func,
  routerParams: PropTypes.object
}

export default connect(
  state => ({
    characters: state.characters
  }),
  actions
)(Character)
