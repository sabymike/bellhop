class Request {
    constructor(origin, destination, elevator) {
        this._orginFloor = origin;
        this._destinationFloor = destination;
        this._elevator = elevator;
        this._mode = 'pickup';
        elevator.on('change:floor', this.elevatorFloorChanged);
    }

    start() {

    }

    elevatorFloorChanged(elevator) {
        var targetFloor = this._mode === 'pickup' ? this._originFloor : this._destinationFloor;
        if (this.elevator.currentFloor !== targetFloor) {

        }
    }
}

module.exports = Request;
