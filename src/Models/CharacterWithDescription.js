import Character from './Character'
import { Loads } from './Enums'
export default class CharacterWithDescription extends Character {

  constructor (obj) {
    super(obj)

    const allValues = {
      Initiative: {Dexterity: this.AbilityModifiers.Dexterity},
      CMD: {
        base: 10,
        Strength: this.AbilityModifiers.Stength,
        Dexterity: this.AbilityModifiers.Dexterity,
        Size: this.SizeModifier || 0
      },
      Encumbrance: {},
      AC: {},
      TouchAC: {},
      FlatFootedAC: {},
      SpellResist: {},
      FortSave: {},
      ReflexSave: {},
      WillSave: {},
      BAB: {},
      Speed: {},
      Acrobatics: {},
      Appraise: {},
      Bluff: {},
      Climb: {},
      Craft: {},
      Diplomacy: {},
      DisableDevice: {},
      Disguise: {},
      EscapeArtist:{},
      Fly:{},
      HandleAnimal:{},
      Heal:{},
      Intimidate:{},
      KnowledgeArcana:{},
      KnowledgeDungeoneering:{},
      KnowledgeEngineering:{},
      KnowledgeGeography:{},
      KnowledgeHistory:{},
      KnowledgeLocal:{},
      KnowledgeNature:{},
      KnowledgeNobility:{},
      KnowledgePlanes:{},
      KnowledgeReligion:{},
      Linguistics:{},
      Perception:{},
      Perform:{},
      Profession:{},
      Ride:{},
      SenseMotive:{},
      SleightOfHand:{},
      Spellcraft:{},
      Stealth:{},
      Survival:{},
      Swim:{},
      UseMagicDevice:{}
    }
    Object
      .keys(allValues)
      .forEach(key => {
        Object.defineProperty(this, key, {
          get: () => this.CreateDescription(key, allValues[key])
        })
      }, {})
  }

  returnWithDescripition (stat, description) {
    return {stat, description}
  }

  itemsWithModifier (mod) {
    return this
      .Inventory
      .filter(item => mod in item.Properties)
      .reduce((obj, item) => Object.assign({}, obj, {[item.Name]: item.Properties[mod]}), {})
  }

  characterModifiersFor (mod) {
    return this
      .CharacterModifiers
      .filter(p => mod in p.stat)
      .reduce(p => Object.assign({}, p, {[p.description]: p.value}), {})
  }

  valueFor (obj) {
    return Object.keys(obj)
      .reduce((num, key) => num + obj[key], 0)
  }

  stringFor (obj) {
    return Object.keys(obj)
      .map((item) => `${item}: ${obj[item]}`)
      .join(', ')
  }

  CreateDescription (mod, others = {}) {
    const mods = Object.assign(
      this.itemsWithModifier(mod),
      this.characterModifiersFor(mod),
      others
    )
    const value = this.valueFor(mods)
    const description = this.stringFor(mods)

    return this.returnWithDescripition(value, description)
  }

  // sum of all gear weight (WeightCounts == false means held in bag of holding)
  get GearWeight () {
    return this.returnWithDescripition(this.Inventory.reduce((i, j) => i + (j.WeightCounts ? j.Weight : 0), 0), '')
  }

  get Encumbrance () {
    const weight = this.GearWeight.stat

    const encumbranceArray = [25, 28.75, 32.5, 37.5, 43.75, 50, 57.5, 65, 75, 87.5 ]
    const maxLoad = (this.AbilityScores.Strength > 10)
      ? encumbranceArray[this.AbilityScores.Strength % 10] * Math.pow(4, this.AbilityScores.Strength / 10)
      : this.AbilityScores.Strength * 10

    if (maxLoad / 3 >= weight)
      return Loads.indexOf('Light')
    else if (maxLoad / 3 * 2 >= weight)
      return Loads.indexOf('Medium')
    else if (maxLoad >= weight)
      return Loads.indexOf('Heavy')
    else
      return Loads.indexOf('Overloaded')
  }
}
