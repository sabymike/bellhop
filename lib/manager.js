const Elevator = require('./elevator');

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
}

module.exports = ElevatorManager;
