type Listener = {
  fn: BasicFn;
  once?: boolean;
};

type BasicFn = (...args: any[]) => void;

export class EventEmitter {
  private listeners: { [eventName: string]: Listener[] } = {}; // key-value pair

  addListener(eventName: string, fn: BasicFn, once = false) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push({
      fn,
      once,
    });
  }

  on(eventName: string, fn: BasicFn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName: string, fn: BasicFn) {
    if (this.listeners[eventName]) {
      const ind = this.listeners[eventName].findIndex(
        (el) => el.fn === fn,
      );
      if (ind >= 0) {
        this.listeners[eventName].splice(ind, 1);
      }
    }
  }

  off(eventName: string, fn: BasicFn) {
    this.removeListener(eventName, fn);
  }

  once(eventName: string, fn: BasicFn) {
    this.addListener(eventName, fn, true);
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach((el, index) => {
      el.fn(...args);
      if (el.once) {
        this.listeners[eventName].splice(index, 1);
      }
    });
  }

  listenerCount(eventName: string) {
    if (!this.listeners[eventName]) return 0;

    return this.listeners[eventName].length;
  }

  rawListeners(eventName: string) {
    if (!this.listeners[eventName]) return [];

    return this.listeners[eventName].map((el) => el.fn);
  }
}
