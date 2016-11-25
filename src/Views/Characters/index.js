import React, {Component, PropTypes} from 'react'
import CharacterListItem from './characterListItem'
import 'whatwg-fetch'
import './characters.css'
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'


class Characters extends Component {

  render () {
    const { characters } = this.props

    return (
      <section className='character-pane'>
        <ul className='characters'>
          {
            characters.map(character => (
              <CharacterListItem active={character._id === this.props.router.params.id} character={character} onCharacterSelect={this.props.onCharacterSelect} />
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
Characters.propTypes = {
  children: PropTypes.element,
  onCharacterSelect: PropTypes.func,
  characters: PropTypes.object,
  router: PropTypes.object
}

export default connect(
  state => ({
    user: state.user,
    characters: state.characters
  }),
  actions
)(Characters)
