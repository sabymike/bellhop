'use strict';

const Manager = require('./lib/manager');

let manager = new Manager(10, 0);
console.log(manager._elevators);
