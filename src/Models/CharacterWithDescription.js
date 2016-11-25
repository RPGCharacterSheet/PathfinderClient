import Character from './character'
export default class CharacterWithDescription extends Character {
  constructor (obj) {
    super(obj)
  }

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

  stringFor (obj, mod) {
    return Object.keys(obj)
      .map((item) => `${item.Name}: ${item.Properties[mod]}`)
      .join(', ')
  }

  CreateDescription (mod, others = {}) {
    const mods = Object.assign(
      this.itemsWithModifier(mod),
      (this.featsWithModifer || ()=>({}))(mod),
      others
    )
    const value = this.valueFor(modifiers)
    const description = this.stringFor(modifiers, mod)

    return this.returnWithDescripition(value, description)
  }

  get Initiative () {
    CreateDescription('Initiative', { 
      Dexterity: super.AbilityModifiers.Dexterity 
    })
  }
}

Object.keys(allValues).reduce((obj, key) => Object.assign({}, obj, this.CreateDescription(key, allVaues[key])), {})

{
    Initiative: {Dexterity: super.AbilityModifiers.Dexterity},
    CMD: { 
        base: 10, 
        Strength: super.AbilityModifiers.Stength, 
        Dexterity: super.AbilityModifiers.Dexterity, 
        Size: this.SizeModifier || 0        
    },
    GearWeight: {},
    Encumbrance: {},
    AC: {},
    TouchAC: {},
    FlatFootedAC: {},
    SpellResist: {},
    FortSave:{},
    ReflexSave:{},
    WillSave:{},
    BAB:{},
    Speed:{},
    Acrobatics: {},         
    Appraise:{},     
    Bluff:{}, 
    Climb:{},
    Craft:{},
    Diplomacy:{},
    DisableDevice:{},
    Disguise:{},
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
    UseMagicDevice:{},


}
