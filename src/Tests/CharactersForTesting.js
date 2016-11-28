import CharacterWithDescription from '../Models/CharacterWithDescription'
import blankCharacter from './Character'
import blankItem from './InventoryItem'
import Enums from '../Models/Enums'
const { Race, Size, Alignment } = Enums

export function GetBlankCharacter () {
  return new CharacterWithDescription(blankCharacter)
}

export function GetBob(){
  let bob = GetBlankCharacter()
  
  bob.AbilityScores.Strength = 10 
  bob.AbilityScores.Constitution = 10 
  bob.AbilityScores.Dexterity = 10 
  bob.AbilityScores.Wisdom = 10 
  bob.AbilityScores.Intelligence = 10 
  bob.AbilityScores.Charisma = 10

  //This could be condensed to this
  // bob.AbilityScores = Object.keys(bob.AbilityScores)
  //   .reduce((obj, key) => ({ ...obj, [key]: 10 }), {})

  bob.Race = Race.indexOf("Human")
  return bob
}

export function GetLarry(){
  let larry = GetBlankCharacter()
  larry.AbilityScores.Strength = 18 
  larry.AbilityScores.Constitution = 18 
  larry.AbilityScores.Dexterity = 18 
  larry.AbilityScores.Wisdom = 18 
  larry.AbilityScores.Intelligence = 18 
  larry.AbilityScores.Charisma = 18
  return larry
}
