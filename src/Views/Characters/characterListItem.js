import React, {Component, PropTypes} from 'react'

class CharacterListItem extends Component {

  shouldComponentUpdate (next) {
    const props = this.props
    return (next.active !== props.active || next.character !== props.character)
  }

  render () {
    const { character, active } = this.props
    return (
      <li
        className={['character-list', ((active) ? 'active' : '')].join(' ')}
        key={character._id['$oid']}
        onClick={() => this.props.onCharacterSelect(character._id)}
      >
        <h2>{character.Name}</h2>
        {
          ['Level', 'Classes', 'Race', 'XPCurrent'].map(key => (
            <div key={key + character._id}>{`${key}: ${character[key]}`}</div>
          ))
        }
      </li>
    )
  }
}

CharacterListItem.propTypes = {
  character: PropTypes.object,
  active: PropTypes.bool,
  onCharacterSelect: PropTypes.func
}

export default CharacterListItem
