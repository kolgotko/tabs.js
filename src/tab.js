'use strict';

class Tab {

	constructor(node) {

		this._node = node;
		this._status = null;
		this._frame = null;

		this._extractFrame();
		this._extractStatus();

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

	combineWithFrame(node) {

		this._frame = node;

	}

	show() {

		let node = this._node;
		let frame = this._frame;

		node.classList.add('shows')
		node.classList.remove('hidden');

		frame.classList.add('shows')
		frame.classList.remove('hidden');

		this._status = 'shows';

	}

	hide() {

		let node = this._node;
		let frame = this._frame;

		node.classList.add('hidden')
		node.classList.remove('shows');

		frame.classList.add('hidden')
		frame.classList.remove('shows');

		this._status = 'hidden';

	}

	toggle() {

		if (this._status === 'hidden')
			this.show();

		else this.hide();

	}

}

export default Tab;
