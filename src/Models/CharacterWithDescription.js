import Character from './Character'
import { Loads } from './Enums'
export default class CharacterWithDescription extends Character {

  AddUpClass(key) {
    return this.Classes.reduce((saves, c) => {
      return { ...saves, [c.Name]: c[key] }
    }, {})
  }

  constructor (obj) {
    super(obj)

    const Stats = {
      Initiative: () => ({Dexterity: this.AbilityModifiers.Dexterity.stat}),
      CMD: () => ({
        base:  10,
        Strength: this.AbilityModifiers.Strength.stat,
        Dexterity:this.AbilityModifiers.Dexterity.stat,
        Size:  this.SizeModifier || 0
      }),
      Encumbrance:() => ({}),
      AC:() => ({}),
      TouchAC:() => ({}),
      FlatFootedAC:() => ({}),
      SpellResist:() => ({}),
      FortSave:() => {
        return this.AddUpClass('FortSave')
      },
      ReflexSave:() => this.AddUpClass('ReflexSave'),
      WillSave:() => this.AddUpClass('WillSave'),
      BAB:() => ({}) ,
      Speed:() => ({}),
      Acrobatics:() => ({}),
      Appraise:() => ({}),
      Bluff:() => ({}),
      Climb:() => ({}),
      Craft:() => ({}),
      Diplomacy:() => ({}),
      DisableDevice:() => ({}),
      Disguise:() => ({}),
      EscapeArtist:() => ({}),
      Fly:() => ({}),
      HandleAnimal:() => ({}),
      Heal:() => ({}),
      Intimidate:() => ({}),
      KnowledgeArcana:() => ({}),
      KnowledgeDungeoneering:() => ({}),
      KnowledgeEngineering:() => ({}),
      KnowledgeGeography:() => ({}),
      KnowledgeHistory:() => ({}),
      KnowledgeLocal:() => ({}),
      KnowledgeNature:() => ({}),
      KnowledgeNobility:() => ({}),
      KnowledgePlanes:() => ({}),
      KnowledgeReligion:() => ({}),
      Linguistics:() => ({}),
      Perception:() => ({}),
      Perform:() => ({}),
      Profession:() => ({}),
      Ride:() => ({}),
      SenseMotive:() => ({}),
      SleightOfHand:() => ({}),
      Spellcraft:() => ({}),
      Stealth:() => ({}),
      Survival:() => ({}),
      Swim:() => ({}),
      UseMagicDevice:() => ({})
    }
    this._abilityScores = { ...this.AbilityScores }

    this.defineGetters(this.AbilityScores, this.convertToBase(this._abilityScores))

    this._abilityModifiers = Object
      .getOwnPropertyNames(this.AbilityScores)
      .reduce((val, key) => Object.defineProperty(val, key, {
        get: () => this.getModifer(this.AbilityScores[key].stat)
      }), {})
    this.AbilityModifiers = {}
    this.defineGetters(this.AbilityModifiers, this.convertToBase(this._abilityModifiers))
    this.defineGetters(this, Stats)
  }

  getModifer(val) { return Math.floor( val / 2 ) - 5 }

  convertToBase(o) {
    return Object
      .getOwnPropertyNames(o)
      .reduce((obj, key) => {
        return Object.defineProperty(obj, key, {
          get: () =>  () => ({ base: o[key] })
        })
      }, {})
  }

  defineGetters(holder, lookup) {
    return Object
      .getOwnPropertyNames(lookup)
      .forEach((key) => {
        return Object.defineProperty(holder, key, {
          get: () => {
            return this.CreateDescription(key, lookup[key]())
          }
        })
      })
  }

  returnWithDescripition (stat, description) {
    return {stat, description}
  }

  itemsWithModifier (mod) {
    return this
      .Inventory
      .filter(item => mod in item.Properties && item.IsEquipped)
      .reduce((obj, item) => Object.assign({}, obj, {[item.Name]: item.Properties[mod]}), {})
  }

  characterModifiersFor (mod) {
    return this
      .CharacterModifiers
      .filter(p => mod in p.stat)
      .reduce(p => Object.assign({}, p, {[p.description]: p.value}), {})
  }

  valueFor (obj) {
    return Object.getOwnPropertyNames(obj)
      .reduce((num, key) => num + obj[key], 0)
  }

  stringFor (obj) {
    return Object.getOwnPropertyNames(obj)
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
