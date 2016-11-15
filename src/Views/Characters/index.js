import React, {Component} from 'react'
import 'whatwg-fetch'
import './characters.css'

import { connect } from 'react-redux'

import * as actions from '../../Redux/actions'
class Characters extends Component {
  static propTypes = {
    user: Object,
    router: Object
  }

  render () {
    const { characters } = this.props
    if(this.props.children) return this.props.children
    return (
      <div className='characters'>
        {
          characters.map(character => (
            <div 
              className='character' 
              key={character._id}
//              onClick={() => this.props.onCharacterSelect(character._id)}
            >
              <h2>{character.Name}</h2>
              {['Level', 'Classes', 'Race', 'XPCurrent'].map(key => (
                <div key={key}>{`${key}: ${character[key]}`}</div>
              ))}
            </div>
          ))
        }
      </div>
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