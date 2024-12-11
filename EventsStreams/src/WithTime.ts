import { EventEmitter } from './EventEmitter';
import { performance } from 'perf_hooks';

type AsyncFunc = (...args: any[]) => void;

export class WithTime extends EventEmitter {
  async execute(asyncFunc: AsyncFunc, ...args: any[]) {
    this.emit('begin');
    const start = performance.now();
    asyncFunc(...args, (error: Error | null, result?: any) => {
      if (error) {
        this.emit('error', error);
        return;
      }
      const end = performance.now();
      this.emit('data', result, end - start);
      this.emit('end');
    });
  }
}
