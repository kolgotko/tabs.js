'use strict';

class EventEmitter {

    constructor() {

        this._queue = [];

    }

    emit(...argv) {

        this._queue.forEach((handler) => {

            handler(...argv);

        });

    }

    push(handler) {

        this._queue.push(handler);
        return this;

    }

    clear() {

        this._queue = [];

    }

}

export default EventEmitter;
