'use strict';

const Manager = require('./lib/manager');

let manager = new Manager(10, 2);

let elevator = manager._elevators[0];
elevator.gotoFloor(200);
