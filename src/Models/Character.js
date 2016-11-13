import Enums from './Enums'
const { Race, Size, Alignment } = Enums


export default function Character (obj) {
  return {
    ...obj,
    _id: obj._id['$oid'],
    Owner: obj.Owner['$oid'],
    Race: Race[obj.Race],
    Size: Size[obj.Size],
    Alignment: Alignment[obj.Alignment]
  }
}
