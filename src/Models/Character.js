import Enums from './Enums'
import Class from './Class'
const { Race, Size, Alignment } = Enums


export default class Character {
  constructor (obj) {
    Object.assign(this, obj, {
      Race: Race[obj.Race],
      Size: Size[obj.Size],
      Alignment: Alignment[obj.Alignment],
      Classes: obj.Classes.map(c => new Class(c))
    })
  }
}
