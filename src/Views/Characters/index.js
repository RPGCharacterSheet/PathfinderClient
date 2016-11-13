import React, {Component} from 'react'
import 'whatwg-fetch'
import './characters.css'

import Models from '../../Models'

class Characters extends Component {
  static porpTypes = {
    user: Object,
    router: Object
  }

  constructor (props) {
    super(props)
    if (!(this.props.user)) {
      this.props.router.replace('/')
    } else {
      fetch(`/Character?user=${this.props.user._id}`)
        .then(res => res.json())
        .then(json => json.map(Models.Character))
        .then(this.props.charactersUpdate)
    }
  }

  render () {
    const { characters } = this.props
    return (
      <div className='characters'>
        {
          characters.map(character => (
            <div 
              className='character' 
              key={character._id}
              onClick={() => this.props.onCharacterSelect(character._id)}
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

export default Characters