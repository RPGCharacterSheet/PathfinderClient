export default class InventoryItem {
  constructor(obj) {
      this.Name = ""
      this.IsEquipped = false
      this.Weight = 0
      this.WeightCounts = true
      this.GoldValue = 0.0
      this.Damage = ""
      this.Critical = ""
      this.Special = ""
      this.Properties = {}
      this.Notes = ""
      Object.assign(this, obj)
  }
  
}
