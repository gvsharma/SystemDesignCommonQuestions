const ParkingLot = require('./ParkingLot')
// import ParkingLot from './ParkingLot'

class Car {
  constructor(numberPlate, type) {
    this.numberPlate = numberPlate
    this.type = type // 0: sedan, 1: truck
    this.parkStart = null
    // get singleton
    this.lot = ParkingLot.getInstance()
  }
  findSlot() {
    let slot = null
    if (this.type == 0) {
      if (this.lot.emptyCarSlots.length > 0) {
        slot = this.lot.emptyCarSlots.pop()
      }
    } else if (this.type == 1) {
      if (this.lot.emptyTruckSlots.length > 0) {
        slot = this.lot.emptyTruckSlots.pop()
      }
    }
    return slot
  }
  park() {
    const slot = this.findSlot()
    if (slot != null) {
      this.lot.occupiedSlots[this.numberPlate] = slot
      slot.beOccupied(this)
      this.parkStart = new Date().getTime()
      return true
    }
    // false: cant find any slot
    return false
  }
  leave() {
    const slot = this.lot.occupiedSlots[this.numberPlate]
    if (slot == undefined || slot == null) {
      // didn't park at all
      return 0
    }
    slot.beFree()
    delete this.lot.occupiedSlots[this.numberPlate]
    if (slot.type == 0) {
      this.lot.emptyCarSlots.push(slot)
    } else if (slot.type == 1) {
      this.lot.emptyTruckSlots.push(slot)
    }
    const now = new Date().getTime()
    const timeDiff = now - this.parkStart
    const amount = timeDiff // in reality every hour $1
    // quit the car park
    return amount
  }
}

module.exports = Car