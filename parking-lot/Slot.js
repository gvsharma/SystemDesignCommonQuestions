class Slot {
  constructor(id, type) {
    this.id = id
    this.type = type
    this.available = true
    this.vehicle = null
  }
  beOccupied(v) {
    this.vehicle = v
    this.available = false
  }
  beFree() {
    this.vehicle = null
    this.available = true
  }
}

module.exports = Slot