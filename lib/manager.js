const Elevator = require('./elevator');
const Request = require('./request');

class ElevatorManager {
    constructor(floors, elevatorCount) {
        this._floors = Math.max(floors, 1);
        this._elevators = [];

        elevatorCount = Math.max(elevatorCount, 1);
        for (let i = 0; i < elevatorCount; i++) {
            let newElevator = new Elevator(this._floors);
            this._elevators.push(newElevator)
        }
    }

    get numFloors() {
        return this._floors;
    }

    findClosestElevator(floor) {
        let closest;
        let prevDistance = Number.MAX_SAFE_INTEGER;
        this._elevators.forEach((elevator) => {
            if (elevator.isAvailable && elevator.isOccupied === false) {
                let distance = elevator.distanceFromFloor(floor);
                if distance < prevDistance {
                    closest = elevator;
                    prevDistance = distance;
                }
            }
        });
        return closest;
    }

    callElevator(fromFloor, toFloor) {
        const elevator = this.findClosestElevator(fromFloor);
        if (elevator) {
            let request = new Request(fromFloor, toFloor, elevator);
            request.start();
        }
    }
}

module.exports = ElevatorManager;
