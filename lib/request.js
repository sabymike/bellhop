class Request {
    constructor(origin, destination, elevator) {
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
        var targetFloor = this._mode === 'pickup' ? this._originFloor : this._destinationFloor;
        var floorDiff = this._elevator.currentFloor - targetFloor;
        if (floorDiff === 0) {
            if (this._mode === 'pickup') {
                // now to the destination
                this.fillElevator();
                this._mode == 'destination';
            } else {
                // done with this request
                this.emptyElevator();
                this._elevator.release();
            }
        } else {
            if (floorDiff > 0) {
                // higher than target, go down
                this._elevator.goDown();
            } else {
                // lower than target, go up
                this._elevator.goUp();
            }
        }
    }

    fillElevator() {
        this._elevator.openDoors();
        this._elevator.isOccupied(true);
        this._elevator.closeDoors();
    }

    emptyElevator() {
        this._elevator.openDoors();
        this._elevator.isOccupied(false);
        this._elevator.closeDoors();
    }
}

module.exports = Request;
