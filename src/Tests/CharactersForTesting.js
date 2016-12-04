import CharacterWithDescription from '../Models/CharacterWithDescription'
import blankCharacter from './Character'
import blankItem from './InventoryItem'
import Enums from '../Models/Enums'
import Class from '../Models/Class'
import Classes from '../Models/Classes'
const { Race, Size, Alignment, SaveGrowth } = Enums
Object.freeze(blankItem)
Object.freeze(blankCharacter)


export function GetBlankCharacter () {
  return new CharacterWithDescription(blankCharacter)
}

export function getBlankItem(obj){
  return Object.create({ ...blankItem, ...obj })
}

export function GetBob(){
  let bob = GetBlankCharacter()

  bob._abilityScores.Strength = 10
  bob._abilityScores.Constitution = 10
  bob._abilityScores.Dexterity = 10
  bob._abilityScores.Wisdom = 10
  bob._abilityScores.Intelligence = 10
  bob._abilityScores.Charisma = 10


  //This could be condensed to this
  // bob.AbilityScores = Object.keys(bob.AbilityScores)
  //   .reduce((obj, key) => ({ ...obj, [key]: 10 }), {})

  bob.Race = Race.indexOf("Human")
  bob.Classes.push(new Class(Classes.Fighter))
  return bob
}

export function GetLarry(){
  let larry = GetBlankCharacter()
  larry._abilityScores.Strength = 18
  larry._abilityScores.Constitution = 18
  larry._abilityScores.Dexterity = 18
  larry._abilityScores.Wisdom = 18
  larry._abilityScores.Intelligence = 18
  larry._abilityScores.Charisma = 18
  larry.Race = Race.indexOf("Tengu")
  larry.Classes = [
    new Class({ ...Classes.Inquisitor, Level: 5 }),
    new Class(Classes.Cavalier)
  ]
  larry.Inventory.push(getBlankItem({
    Name: "Cloak of Resistance",
    IsEquipped: true,
    Weight: 5,
    GoldValue: 100.5,
    Properties: {
      FortSave:1,
      WillSave:1,
      ReflexSave:1
    }
  }))
  larry.Inventory.push(getBlankItem({
    Name: "Headband of Alluring Charisma",
    IsEquipped: false,
    Weight: 5,
    GoldValue: 18000,
    Properties: {
      Charisma:6
    }
  }))
  larry.Inventory = [
    ...larry.Inventory,
    ...Array.from({length:4}).map(() => getBlankItem())
  ]
  return larry
}
