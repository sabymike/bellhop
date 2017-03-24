'use strict';

const EventEmitter = require('event-emitter-es6');

class Elevator extends EventEmitter {
    constructor(topFloor) {
        super();
        this._floor = 1;
        this._moving = false;
        this._openDoors = false;
        this._bottomFloor = 1;
        this._topFloor = topFloor;
        this._tripCount = 0;
        this._occupied = false;
    }

    get isOccupied() {
        return this._occupied;
    }

    get isMoving() {
        return this._moving;
    }

    get currentFloor() {
        return this._floor;
    }

    claim() {
        this._moving = true;
    }

    release() {
        this._moving = false;
    }

    distanceFromFloor(floor) {
        return Math.abs(floor - this._floor);
    }

    openDoors() {
        this._openDoors = true;
        this.emit('door:open', this);
    }

    closeDoors() {
        this._openDoors = false;
        this.emit('door:close', this);
    }

    goUp() {
        if (this._floor < this._topFloor) {
            this._floor++;
            this.emit('floor:change', this);
        }
    }

    goDown() {
        if (this._floor > 1) {
            this._floor--;
            this.emit('floor:change', this);
        }
    }

    // gotoFloor(newFloor) {
    //     newFloor = Math.min(Math.max(newFloor, this._bottomFloor), this._topFloor);
    //     if (newFloor > this._floor) {
    //         // go up
    //     } else if (newFloor < this._floor) {
    //         // go down
    //     }
    //
    //     setTimeout(() => {
    //         this.gotoFloor(newFloor);
    //     });
    //
    //     console.log('goind to new floor', newFloor);
    //
    //     // this._moving = true;
    //     // this.emit('floor:change', this);
    //     //
    //     // setTimeout(() => {
    //     //     this._floor = newFloor;
    //     //     this._moving = false;
    //     // }, Math.random() * (10000 - 1000) + 1000);
    // }
}

module.exports = Elevator;
