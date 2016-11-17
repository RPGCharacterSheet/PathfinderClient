import Enums from './Enums'
const { Race, Size, Alignment } = Enums


export default class Character {
  constructor (obj) {
    Object.assign(this, obj, {
      Race: Race[obj.Race],
      Size: Size[obj.Size],
      Alignment: Alignment[obj.Alignment]
    })
  }

  GetAbilityModifier (i) { return Math.floor(i / 2) - 5 }

  get AbilityModifiers () {
    const mods = Object.keys(this.AbilityScores).map(key => ({ [key]: this.GetAbilityModifier(this.AbilityScores[key]) }))
    return Object.assign.apply(null, mods)
  }

  get Initiative () {
    return this.AbilityModifiers.Dexterity
  }
}
