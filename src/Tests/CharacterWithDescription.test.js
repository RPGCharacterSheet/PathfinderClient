/* global it */
import CharacterWithDescription from '../Models/CharacterWithDescription'
import blankCharacter from './Character'
import blankItem from './InventoryItem'

Object.freeze(blankItem)
Object.freeze(blankCharacter)

import { GetBob, GetLarry, GetBlankCharacter } from './CharactersForTesting'

var assert = require('assert')

function getBlankItem(values) {
  return Object.create(Object.assign({}, blankItem, values))
}

it('Should be able to create a blank character', () => {
  assert.doesNotThrow(() => {GetBlankCharacter()})
})

it('Blank character should be immutable', () =>{
  GetBlankCharacter().Name = "mutant"
  assert.notEqual("mutant", GetBlankCharacter().Name)
})

it('Gear weights should add up correctly', () =>{
  let char = GetBlankCharacter()
  assert.equal(0, char.GearWeight.stat)
  let newItem = getBlankItem()
  newItem.Weight = 3.5
  char.Inventory = [ ...char.Inventory, newItem]
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
  assert.equal(10, bob.AbilityScores.Strength.stat)
  assert.equal("Fighter", bob.Classes[0].Name)
  assert.equal(10, bob.Classes[0].ClassSkills.length)
  assert.equal(0, bob.Inventory.length)
})

it('Larry should be ready for testing', () =>{
  let larry = GetLarry()
  assert.equal(6, larry.Inventory.length)
  assert.equal(18, larry.AbilityScores.Charisma.stat)
  assert.equal(2, larry.Classes.length)
  assert.equal(5, larry.Classes.find((c) => c.Name === "Inquisitor").Level)
  assert.equal(7, larry.FortSave.stat) // 4 from inquisitor, 2 from cavalier, 1 from gear
})

it('Larrys gear should affect his stats', ()=>{
  let larry = GetLarry()
  assert.equal(18, larry.AbilityScores.Charisma.stat)
  larry.Inventory.find((item) => item.Name === "Headband of Alluring Charisma").IsEquipped = true
  assert.equal(24, larry.AbilityScores.Charisma.stat)
  assert.equal(7, larry.FortSave.stat)
  larry.Inventory.find((item) => item.Name === "Cloak of Resistance").IsEquipped = false
  //assert.equal(6, larry.FortSave.stat)
})

it('Initiative math should work', () =>{
let larry = GetLarry()
assert.equal(4, larry.Initiative.stat)
let bob = GetBob()
assert.equal(0, bob.Initiative.stat)
})

it('CMD math should work', () =>{
  let larry = GetLarry()
  assert.equal(18, larry.CMD.stat)
})
