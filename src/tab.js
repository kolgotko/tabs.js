'use strict';

import EventEmitter from 'event-emitter.js';

class Tab {

    constructor(node) {

        this._node = node;
        this._status = null;
        this._frame = null;
        this._behavior = 'default';
        this._clickHandler = null;
        this._events = {
            'statusChange': new EventEmitter,
        }

        this._extractFrame();
        this._extractStatus();
        this._extractBehavior();

        this._tabWatch();
        this._frameWatch();

    }

    _tabWatch() {

        let node = this._node;

        let watcher = new MutationObserver(mutations => {

            mutations.forEach(mut => {

                let clickHandler = this._clickHandler;
                let removed = [].slice.call(mut.removedNodes);
                let added = [].slice.call(mut.addedNodes);

                if (removed.indexOf(node) === -1) return false;
                if (added.length === 0) return false;

                this.clearClickHandler();
                this._node = added[0];
                this.setClickHandler(this._clickHandler);

            });

        });

        watcher.observe(node.parentNode, {
            childList: true,
        });

    }

    _frameWatch() {

        let frame = this._frame;

        let watcher = new MutationObserver(mutations => {

            mutations.forEach(mut => {

                let removed = [].slice.call(mut.removedNodes);
                let added = [].slice.call(mut.addedNodes);

                if (removed.indexOf(frame) === -1) return false;
                if (added.length === 0) return false;

                this._frame = added[0];

                if (this._status === 'inactive') this.hide();

                else this.show();

            });

        });

        watcher.observe(frame.parentNode, {
            childList: true,
        });

    }

    _extractFrame() {

        let node = this._node;
        let frame = node.dataset['tabFrame'];
        if (!frame) return;

        frame = document.querySelector(frame);
        if (!frame) return;

        this.combineWithFrame(frame);

    }

    _extractStatus() {

        let node = this._node;
        let status = node.dataset['tabSelected'];

        if (status) this.show();
        else this.hide();

    }

    _extractBehavior() {

        let node = this._node;
        this._behavior = node.dataset['tabBehavior'];

    }

    getBehavior() {

        return this._behavior;

    }

    setBehavior(behavior) {

        this._behavior = behavior;
        return this;

    }

    combineWithFrame(node) {

        this._frame = node;

    }

    show() {

        let node = this._node;
        let frame = this._frame;
        let event = this._events['statusChange'];

        node.classList.add('active')
        node.classList.remove('inactive');

        frame.classList.add('active')
        frame.classList.remove('inactive');

        this._status = 'active';
        event.emit(this._status, this);

    }

    hide() {

        let node = this._node;
        let frame = this._frame;
        let event = this._events['statusChange'];

        node.classList.add('inactive')
        node.classList.remove('active');

        frame.classList.add('inactive')
        frame.classList.remove('active');

        this._status = 'inactive';
        event.emit(this._status, this);

    }

    toggle() {

        if (this._status === 'inactive')
            this.show();

        else this.hide();

    }

    getNode() {

        return this._node;

    }

    isActive() {

        return this._status === 'active';

    }

    on (eventName, handler) {

        let events = this._events;

        if (events[eventName]) {

            let emitter = events[eventName];
            emitter.push(handler);

        }

    }

    setClickHandler(handler) {

        if (this._clickHandlerl) {

            this.clearClickHandler();

        }

        let node = this._node;
        this._clickHandler = handler;
        node.addEventListener('click', handler);

    }

    getClickHandler() {

        return this._clickHandlerl;

    }

    clearClickHandler() {

        let node = this._node;
        let handler = this._clickHandler;

        if (handler) {

            node.removeEventListener('click', handler);

        }

    }

}

window.Tab = Tab;

export default Tab;
