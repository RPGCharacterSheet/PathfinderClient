/* global it */
// import CharacterWithDescription from '../Models/CharacterWithDescription'
// const CharacterWithDescription = require('../Models/CharacterWithDescription')
var assert = require('assert')

function GetBlankCharacter () {
  // return CharacterWithDescription
  throw new Error('blah')
}

it('Should be able to create a blank character', () => {
  assert.doesNotThrow(GetBlankCharacter())
})
