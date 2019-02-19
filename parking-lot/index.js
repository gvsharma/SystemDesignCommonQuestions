const ParkingLot = require('./ParkingLot')
const Car = require('./Car')

const p = new ParkingLot(3, 3)
let car1 = new Car('Car1', 0)
console.log(car1.park())

let car2 = new Car('Car2', 0)
console.log(car2.park())

let car3 = new Car('Car3', 0)
console.log(car3.park())

let car4 = new Car('Car4', 0)
console.log(car4.park())

console.log(car1.leave())
console.log(car4.park())