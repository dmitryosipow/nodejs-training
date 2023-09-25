import { EventEmitter } from "./EventEmitter.js";
import { performance } from 'perf_hooks';

export  class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const start = performance.now();
        const result = await asyncFunc(...args);
        const end = performance.now();
        this.emit('data', result, end - start);
        this.emit('end');
    }
}