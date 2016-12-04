/* global it */
import CharacterWithDescription from '../Models/CharacterWithDescription'
import blankCharacter from './Character'
import InventoryItem from './InventoryItem'

Object.freeze(blankCharacter)

import { GetBob, GetLarry, GetBlankCharacter } from './CharactersForTesting'

var assert = require('assert')

export function getBlankItem(obj){
  return new InventoryItem(obj)
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
  let newItem = getBlankItem({
    Weight: 3.5
  })
  char.Inventory = [ ...char.Inventory, newItem]
  let newItem2 = getBlankItem({
    Weight: 4
  })
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
  larry.Inventory = larry.Inventory.map(i => ({ ...i, IsEquipped: true }))
  assert.equal(24, larry.AbilityScores.Charisma.stat)
  larry.Inventory = larry.Inventory.map(i => ({ ...i, IsEquipped: false }))
  assert.equal(18, larry.AbilityScores.Charisma.stat)

  assert.equal(6, larry.FortSave.stat)
  larry.Inventory = larry.Inventory.map(i => ({ ...i, IsEquipped: true }))
  assert.equal(7, larry.FortSave.stat)
  larry.Inventory = larry.Inventory.map(i => ({ ...i, IsEquipped: false }))
  assert.equal(6, larry.FortSave.stat)
})

it('Class levels should affect stats', () =>{
  let bob = GetBob()
  assert.equal(2, bob.FortSave.stat)
  assert.equal(0, bob.WillSave.stat)
  assert.equal(0, bob.ReflexSave.stat)
  bob.Classes[0].Level = 4
  assert.equal(4, bob.FortSave.stat)
  assert.equal(1, bob.WillSave.stat)
  assert.equal(1, bob.ReflexSave.stat)
})

it('Initiative math should work', () =>{
let larry = GetLarry()
larry.Inventory.find((item) => item.Name === "Gloves of Greater Initiative").IsEquipped = false
assert.equal(4, larry.Initiative.stat)
larry.Inventory.find((item) => item.Name === "Gloves of Greater Initiative").IsEquipped = true
assert.equal(8, larry.Initiative.stat)
})

it('CMD math should work', () =>{
  let larry = GetLarry()
  assert.equal(18, larry.CMD.stat)
})