/* global fetch */
import React, {Component, PropTypes} from 'react'
import CharacterListItem from './characterListItem'
import 'whatwg-fetch'
import './characters.css'
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions'


class Characters extends Component {

  componentDidMount () {
    if (!this.props.user.loggedIn) {
      this.props.router.push('/')
    }
    Promise.resolve(this.props.user)
    .then((user) => fetch(`/Character?user=${user._id}`))
    .then(res => res.json())
    .then(characters => characters.map(char => Object.assign(char, { _id: char._id['$oid'], Owner: char.Owner['$oid'] })))
    .then(characters => this.props.updateCharacters(characters))
  }
  render () {
    const { characters } = this.props

    return (
      <section className='character-pane'>
        <ul className='characters'>
          {
            characters.map((character, idx) => (
              <CharacterListItem
                key={idx}
                active={character._id === this.props.router.params.id}
                character={character}
                onCharacterSelect={this.props.onCharacterSelect}
              />
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
  updateCharacters: PropTypes.func,
  children: PropTypes.element,
  onCharacterSelect: PropTypes.func,
  characters: PropTypes.array,
  router: PropTypes.object,
  user: PropTypes.object
}

export default connect(
  state => ({
    user: state.user,
    characters: state.characters
  }),
  actions
)(Characters)
