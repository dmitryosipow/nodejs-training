export class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn, once = false) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push({
            fn,
            once
        });
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        if (this.listeners[eventName]) {
            const ind = this.listeners[eventName].findIndex(el => el.fn === fn);
            if (ind >= 0) {
                this.listeners[eventName].splice(ind, 1);
            }
        }
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        this.addListener(eventName, fn, true);
    }

    emit(eventName, ...args) {
        if (!this.listeners[eventName]) return;
        this.listeners[eventName].forEach((el, index) => {
            el.fn(...args);
            if (el.once) {
                this.listeners[eventName].splice(index, 1);
            }
        });
    }

    listenerCount(eventName) {
        if (!this.listeners[eventName]) return 0;

        return this.listeners[eventName].length;
    }

    rawListeners(eventName) {
        if (!this.listeners[eventName]) return [];

        return this.listeners[eventName].map(el => el.fn);
    }
}