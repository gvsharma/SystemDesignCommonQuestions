/*
    You are going to design a system for a Car Rental Shop

    requirements:
    - there are 3 types of car, small, medium, large
    - a customer can rent any car
    - but if there is no such car, give him a smaller car
        e.g. if a customer wants to rent a large car but there is no large car, give him a medium car.\
    - when a customer return a car, rental shop would charge him the price to refuel the gas back to full tank
*/
class Car {
    constructor(id, type, gas) {
        this.id = id
        this.type = type
        this.gas = gas
    }
}

class CarRentalShop {
    constructor(cars) {
        this.GAS_PRICE = 1000
        this.ids = {} // id: Car instance
        this.freeCars = [[], [], []] // IDs of small, medium, large
        this._addCars(cars)
    }

    _addCars(cars) {
        for (let car of cars) {
            if (car instanceof Car == false) {
                continue
            }
            car.gas = 100
            if (car.type == 0 || car.type == 1 || car.type == 2) {
                this.freeCars[car.type].push(car.id)
            }
            this.ids[car.id] = car
        }
    }

    lendCar(type) {
        while (type >= 0 && this.freeCars[type].length == 0) {
            type -= 1
        }
        if (type == -1) {
            return null
        }
        const carId = this.freeCars[type].pop()
        return this.ids[carId]
    }

    receiveCar(id, gas) {
        if (this.ids[id] == undefined) {
            return null
        }
        const charge = (100 - gas) * this.GAS_PRICE
        const car = this.ids[id]
        this.cars[car.type].append(id)
        return charge
    }
}