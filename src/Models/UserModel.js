export default function User (obj) {
  return {
    _id: obj._id['$oid'],
    UserName: obj.UserName,
    Email: obj.Email
  }
}
