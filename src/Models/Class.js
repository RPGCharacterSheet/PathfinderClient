import Enums from './Enums'
const { SaveGrowth, Abilities, Skills } = Enums
const noop = () => 0

function FixEnumForClass(classObj = { ClassSkills: [] }) {
  return { 
    ...classObj,
    "FortGrowth": SaveGrowth[classObj.FortGrowth],
    "ReflexGrowth": SaveGrowth[classObj.ReflexGrowth],
    "WillGrowth": SaveGrowth[classObj.WillGrowth],
    "ClassSkills": classObj.ClassSkills.map(skill => Skills[skill]),//Deal with later
    "SpellCastingBonus": Abilities[classObj.SpellCastingBonus]
  }
}

export default class Class {
   constructor (obj) {
    Object.assign(this, {
      Level: 1,
      Name: "",      
      HitDice: 8,
      BABGrowth: 0.75,
      FortGrowth: SaveGrowth.Poor,
      ReflexGrowth: SaveGrowth.Poor,
      WillGrowth: SaveGrowth.Poor,
      SkillGrowth: 4,
      ClassSkills: {},
      SpellCastingBonus: {}
    }, FixEnumForClass(obj))
  }

  get FortSave(){
    return this.FortGrowth(this.Level)
  }

  get WillSave(){
    return this.WillGrowth(this.Level)
  }

  get ReflexSave(){
    return this.ReflexGrowth(this.Level)
  }
}