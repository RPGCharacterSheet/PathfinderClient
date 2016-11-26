import React, {Component, PropTypes} from 'react'

import './character.css'

import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'

// import ChangableInput from './ChangableInput'
import Block from './block'

import UI from './ui'
import Models from '../../Models'


class Character extends Component {
  render () {
    const selected = this.props.routeParams.id
    const character = new Models.CharacterWithDescription(this.props.characters.find(ch => ch._id === selected))
    return (
      <div>
        {
          UI.map((block, idx) => (
            <Block key={idx} {...block} character={character} level={1} selected={selected} />
          ))
        }
      </div>
    )
  }
}
Character.propTypes = {
  characters: PropTypes.array,
  updateCharacterAbility: PropTypes.func,
  updateCharacter: PropTypes.func,
  routeParams: PropTypes.object
}

export default connect(
  state => ({
    characters: state.characters,
    user: state.user
  }),
  actions
)(Character)
