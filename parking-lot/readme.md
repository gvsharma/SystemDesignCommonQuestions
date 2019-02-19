Build a Parking Lot
===

Basic questions to ask:
- how many slots? dynamic, declared by the admin
- how many storeies? dynamic, declared by the admin
- what types of vechicles are allowed to park? sedan, truck...etc
- for now, can i assume that sedan can only park at the small slot, and truck can only park at the big slot? yes
- how about the fee? $1 for 1 hour
- can i assume that all the car number plates are unique? yes LOL

OO Design
---
We need
- Car park: a singleton which all the slots are located
- Slot: a class for each slot instance in the car park
  - beOccupied()
  - beFree()
- Car: a class for each car instance
  - park()
  - leave()

Data Structures
---
- stack: a stack for each type of empty slots for parking
- hashmap: to store the occupied slot with a car number. once the car leaves, remove the slot from the hashmap and put it back to stack for parking

Basic API Usage:
---
```
const p = new ParkingLot(3, 3)
let car1 = new Car('Car1', 0)
car1.park() <= true

let car2 = new Car('Car2', 0)
car2.park() <= true

let car3 = new Car('Car3', 0)
car3.park() <= true

let car4 = new Car('Car4', 0)
car4.park() <= false

car1.leave() <= return the amount which car1 should pay

car1.park() <= true, since car1 quit

```

Ref:
- https://xmruibi.gitbooks.io/interview-preparation-notes/content/OOD/DesignExamples/ParkingLot.html