"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRandomNumber;
// getRandomNumber() function exported by default. The function returns a random integer from 1 to 1000
// getRandomNumber.ts
function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}
