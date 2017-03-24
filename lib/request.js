class Request {
    constructor(origin, destination, elevator) {
        this._orginFloor = origin;
        this._destinationFloor = destination;
        this._elevator = elevator;
    }
}

module.exports = Request;
