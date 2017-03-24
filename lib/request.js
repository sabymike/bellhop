'use strict';

const EventEmitter = require('event-emitter-es6');

class Request extends EventEmitter {
    constructor(origin, destination, elevator) {
        super();
        this._orginFloor = origin;
        this._destinationFloor = destination;
        this._elevator = elevator;
        this._mode = 'pickup';
        elevator.on('change:floor', this.elevatorFloorChanged);
    }

    start() {
        this._elevator.claim();
        this.elevatorFloorChanged(this._elevator);
    }

    elevatorFloorChanged(elevator) {
        const targetFloor = this._mode === 'pickup' ? this._originFloor : this._destinationFloor;
        const currentFloor = this._elevator.currentFloor;
        const floorDiff = targetFloor - currentFloor;

        // we have arrived!
        if (floorDiff === 0) {
            if (this._mode === 'pickup') {
                // now to the destination
                this.fillElevator();
                this._mode == 'destination';
                const destinationDiff = currentFloor - this._destinationFloor;
                this.sendElevatorDirection(destinationDiff);
            } else {
                // done with this request
                this.emptyElevator();
                this._elevator.release();
                this.emit('request:complete', this);
            }
        } else {
            this.sendElevatorDirection(floorDiff);
        }
    }

    sendElevatorDirection(direction) {
        if (direction > 0) {
            this._elevator.goUp();
        } else {
            this._elevator.goDown();
        }
    }

    fillElevator() {
        this._elevator.openDoors();
        this._elevator.closeDoors();
    }

    emptyElevator() {
        this._elevator.openDoors();
        this._elevator.closeDoors();
    }
}

module.exports = Request;
