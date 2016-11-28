/* global it */
import CharacterWithDescription from '../Models/CharacterWithDescription'
import blankCharacter from './Character'
import blankItem from './InventoryItem'

import { getBob, getLarry, GetBlankCharacter } from './CharactersForTesting'

var assert = require('assert')

function getBlankItem() {
  return Object.create(blankItem)
}

it('Should be able to create a blank character', () => {
  assert.doesNotThrow(() => {GetBlankCharacter()})
})

it('Blank should be immutable', () =>{
  GetBlankCharacter().Name = "mutant"
  assert.notEqual("mutant", GetBlankCharacter().Name)
})

it('Gear weights should add up correctly', () =>{
  let char = GetBlankCharacter()
  assert.equal(0, char.GearWeight.stat)
  let newItem = getBlankItem()
  newItem.Weight = 3.5
  char.Inventory.push(newItem)
  let newItem2 = getBlankItem()
  newItem2.Weight=4
  char.Inventory.push(newItem2)
  assert.equal(2, char.Inventory.length)
  assert.equal(7.5, char.GearWeight.stat)
  newItem.WeightCounts = false
  assert.equal(4, char.GearWeight.stat)
})

it('Bob should be ready for testing', () =>{  
  let bob = GetBob()
  assert.equal(10, bob.AbilityScores.Strength)
})
