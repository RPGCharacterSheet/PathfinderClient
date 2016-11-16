export default class UserModel {
  constructor(obj){
    Object.assign(this, {
      _id: obj._id['$oid']
    })
  }
}
