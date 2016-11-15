import React, {Component} from 'react'
import 'whatwg-fetch'
import './characters.css'

import { connect } from 'react-redux'

import * as actions from '../../Redux/actions'
class Characters extends Component {

  render () {
    const { characters: { all: characters } } = this.props
    return (
      <section className='character-pane'>
        <ul className='characters'>
        {
          characters.map(character => (
            <li 
              className='character-list' 
              key={character._id}
              onClick={() => this.props.onCharacterSelect(character._id)}
            >
              <h2>{character.Name}</h2>
              {['Level', 'Classes', 'Race', 'XPCurrent'].map(key => (
                <div key={key}>{`${key}: ${character[key]}`}</div>
              ))}
            </li>
          ))
        }
        </ul>
        <div className='character'>
          {this.props.children}
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    characters: state.characters
  }),
  actions
)(Characters)