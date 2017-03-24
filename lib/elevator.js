'use strict';

const EventEmitter = require('event-emitter-es6');

class Elevator extends EventEmitter {
    constructor(topFloor) {
        super();
        this._floor = 1;
        this._openDoors = false;
        this._bottomFloor = 1;
        this._topFloor = topFloor;
        this._tripCount = 0;
        this._floorCount = 0;
        this._maintenance = false;
        this._working = false;
        this.request = null;
    }

    get isWorking() {
        return this._working;
    }

    set isWorking(val) {
        this._working = val
    }

    get isAvailable() {
        return !this._maintenance;
    }

    get currentFloor() {
        return this._floor;
    }

    // Control
    claim() {
        this._working = true;
    }

    release() {
        this._working = false;
        this.recordTrip()
    }

    // Maintence management
    recordTrip() {
        this._tripCount++;
        if (this._tripCount >= 100) {
            this._maintenance = true;
            this._working = false;
            this.emit('maintenance')
        }
    }

    service() {
        this._tripCount = 0;
        this._maintenance = false;
    }

    // Control doors
    openDoors() {
        this._openDoors = true;
        this.emit('door:open', this);
    }

    closeDoors() {
        this._openDoors = false;
        this.emit('door:close', this);
    }

    // Floor movement
    distanceFromFloor(floor) {
        return Math.abs(floor - this._floor);
    }

    goUp() {
        if (this._floor < this._topFloor) {
            this._floor++;
            this._floorCount++;
            this.emit('floor:change', this);
        }
    }

    goDown() {
        if (this._floor > 1) {
            this._floor--;
            this._floorCount++;
            this.emit('floor:change', this);
        }
    }
}

module.exports = Elevator;
