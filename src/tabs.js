'use strict';

import Tab from "tab.js";

class Tabs {

    constructor(selector = null) {

        this._tabsPool = [];

        if (selector !== null) this.add(selector);

    }

    add(selector = ".tab") {

        let nodeList = document.querySelectorAll(selector);
        let nodes = [].slice.call(nodeList);

        nodes.forEach(node => {

            let tab = new Tab(node);
            this.addTab(tab);

        });

    }

    addTab(tab) {

        this._tabsPool.push(tab);

        let context = {
            tab: tab,
            group: this,
        };

        tab.setClickHandler(this._clickHandler.bind(context));

    }

    rmTab(tab) {

        let pool = this._tabsPool;
        let index = pool.indexOf(tab);

        if (index === -1) return false;

        delete(pool[index]);

        tab.clearClickHandler();

        return true;

    }

    hideAll(except) {

        let tabs = this._tabsPool;

        tabs.forEach(tab => {

            if (except === tab) return;

            tab.hide();

        });

    }

    _clickHandler() {

        let tab = this.tab;
        let group = this.group;
        let behavior = tab.getBehavior();

        switch (behavior) {

            case 'toggle':
                group.hideAll(tab);
                tab.toggle();
                break;

            default:
                group.hideAll();
                tab.show();
                break;

        }

    }

}

window.Tabs = Tabs;

export default Tabs;
