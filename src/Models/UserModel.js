export default class UserModel {
  constructor(obj){
    Object.assign(this, obj, {
      _id: obj._id['$oid']
    })
  }
}
