import Character from './Character'
export default class CharacterWithDescription extends Character {

  returnWithDescripition (stat, description) {
    return { stat, description}
  }

  itemsWithModifier (mod) {
    return this
      .Inventory
      .filter(item => mod in item.Properties)
      .reduce((obj, item) => Object.assign({}, obj, {[item.Name]: item.Properties[mod]}), {})
  }

  characterModifiersFor (mod) {
    return this
      .Properties
      .filter (p => mod in p.stat)
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
  get GearWeight(){
    return this.returnWithDescripition(this.Inventory.reduce((i,j) => i + (j.WeightCounts?j.Weight:0), 0), '')
  }

  get Encumbrance(){    
    const encumbranceArray = [25, 28.75,32.5, 37.5, 43.75, 50, 57.5, 65, 75, 87.5 ]
    let maxLoad = this.AbilityScores.Strength * 10
    if (str > 10)
      maxLoad = encumbranceArray[this.AbilityScores.Strength % 10] * Math.pow(4, this.AbilityScores.Strength / 10)
    let EncumbranceByWeight = Loads.Overloaded
    if (maxLoad/3 >= GearWeight().stat)
      EncumbranceByWeight = Loads.Light
    else if (maxLoad/3*2 >= GearWeight().stat)
      EncumbranceByWeight = Loads.Medium
    else if (maxLoad >= GearWeight().stat)
      EncumbranceByWeight = Loads.Heavy

    let EncumbranceByArmor = Loads.Light
  }

  get AllStats () {
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
    return Object.keys(allValues).reduce((obj, key) => Object.assign({}, obj, this.CreateDescription(key, allValues[key])), {})
  }
}
