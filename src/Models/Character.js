import Enums from './Enums'
const { Race, Size, Alignment } = Enums


const GetAbilityModifier = (i) => Math.floor(i / 2) - 5

function AddGetter({ object, key, get }) {
    Object.defineProperty( object, key, { get })
}

export default function Character(obj) {
    const o = Object.assign(obj, {
        _id: obj._id['$oid'],
        Owner: obj.Owner['$oid'],
        Race: Race[obj.Race],
        Size: Size[obj.Size],
        Alignment: Alignment[obj.Alignment]
    })


    const getters = {
        AbilityModifiers: function () {
            const mods = Object.keys(this.AbilityScores).map(key => ({ [key]: GetAbilityModifier(o.AbilityScores[key]) }))
            return Object.assign.apply(null, mods)
        },
        Initative: function () {
            return this.AbilityModifier.Dexterity
        }
    }

    Object
        .keys(getters)
        .forEach(getter => AddGetter({ object: o, key: getter, get: getters[getter] }))

    return o
}
