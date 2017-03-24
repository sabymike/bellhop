'use strict';

const EventEmitter = require('event-emitter-es6');

class Request extends EventEmitter {
    constructor(origin, destination, elevator) {
        super();
        this._orginFloor = origin;
        this._destinationFloor = destination;
        this._elevator = elevator;
        this._mode = 'pickup';
        elevator.request = this;
        elevator.on('change:floor', this.elevatorFloorChanged);
    }

    get targetFloor() {
        this._mode == 'pickup' ? this._originFloor : this._destinationFloor;
    }

    start() {
        this._elevator.claim();
        this.elevatorFloorChanged(this._elevator);
    }

    end() {
        this.emptyElevator();
        this._elevator.release();
        this._elevator.request = null;
        this.emit('request:complete', this);
    }

    elevatorFloorChanged(elevator) {
        const currentFloor = this._elevator.currentFloor;
        const floorDiff = this.targetFloor - currentFloor;

        // we have arrived!
        if (floorDiff === 0) {
            if (this._mode === 'pickup') {
                // now to the destination
                this.fillElevator();
                this._mode == 'destination';
                const destinationDiff = this.targetFloor - currentFloor;
                this.sendElevatorDirection(destinationDiff);
            } else {
                // done with this request
                this.end();
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
