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
        let node = tab.getNode();

        node.addEventListener('click', () => {

            let behavior = tab.getBehavior();

            switch (behavior) {

                case 'toggle':
                    this.hideAll(tab);
                    tab.toggle();
                    break;

                default:
                    this.hideAll();
                    tab.show();
                    break;

            }

        });

    }

    hideAll(except) {

        let tabs = this._tabsPool;

        tabs.forEach(tab => {

            if (except === tab) return;

            tab.hide();

        });

    }

}

window.Tabs = Tabs;

export default Tabs;
