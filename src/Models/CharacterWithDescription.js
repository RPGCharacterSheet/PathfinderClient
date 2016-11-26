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
      (this.featsWithModifer || (()=>({})))(mod),
      others
    )
    const value = this.valueFor(mods)
    const description = this.stringFor(mods)

    return this.returnWithDescripition(value, description)
  }

  get Initiative () {
    return this.CreateDescription('Initiative', {
      Dexterity: this.AbilityModifiers.Dexterity
    })
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
      GearWeight: {},
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
