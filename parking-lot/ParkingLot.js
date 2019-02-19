// import Slot from './Slot'
const Slot = require('./Slot')

class ParkingLot {
  constructor(numOfCars, numOfTrucks) {
    if (ParkingLot.instance) {
      return ParkingLot.instance;
    }
    if (!numOfCars || !numOfTrucks) {
      throw new Error("Please init with 2 params: numOfCars, numOfTrucks")
    }
    this.emptyCarSlots = []
    this.emptyTruckSlots = []
    this.occupiedSlots = {}
    // init the empty slots for parking
    for (let i = 0; i < numOfCars; i++) {
      const temp = new Slot(i, 0)
      this.emptyCarSlots.push(temp)
    }
    for (let i = 0; i < numOfTrucks; i++) {
      const temp = new Slot(i, 1)
      this.emptyTruckSlots.push(temp)
    }
    // set singleton
    ParkingLot.instance = this
  }

  static getInstance() {
    if (ParkingLot.instance) {
      return ParkingLot.instance
    }
    throw new Error("Please init first")
  }
}
// declare singleton
ParkingLot.instance = null

module.exports = ParkingLot