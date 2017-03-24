'use strict';

const Elevator = require('./elevator');
const Request = require('./request');

class ElevatorManager {
    constructor(floors, elevatorCount) {
        this._floors = Math.max(floors, 1);
        this._elevators = [];
        this._requests = [];

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
        for (let i = 0; i < this._elevators.length; i++) {
            const elevator = this._elevators[i];
            if (elevator.isAvailable) {
                const distance = elevator.distanceFromFloor(floor);
                if distance === 0 && elevator.isWorking === false {
                    return elevator;
                } else if elevator.isWorking === true {
                    const request = elevator.request
                    const elevatorFloor = elevator.currentFloor
                    // this elevator will be moving past where we need to go
                    if (elevatorFloor > floor && floor > request.targetFloor ||
                        elevatorFloor < floor && floor < request.targetFloor) {
                        return elevator;
                    }
                } else if distance < prevDistance {
                    closest = elevator;
                    prevDistance = distance;
                }
            }
        }
        return closest;
    }

    callElevator(fromFloor, toFloor) {
        const elevator = this.findClosestElevator(fromFloor);
        if (elevator) {
            const request = new Request(fromFloor, toFloor, elevator);
            this._requests.push(request);

            request.on('request:complete', this.requestComplete);
            request.start();
        }
    }

    requestComplete(request) {
        const index = this._requests.indexOf(request);
        if (index > -1) {
            this._requests.splice(index, 1);
        }
    }
}

module.exports = ElevatorManager;
