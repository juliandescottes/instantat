(function () {
	var $ = function (id) {return document.getElementById(id);};
	var bind = function (method, scope) {return function () {method.apply(scope, arguments);};};
	var SPLITTER_DIM = 6;
	var currentSplitter = null;

	var Splitter = function (splitterId, orientation, callback) {
		this.handle = $(splitterId);
		this.proxy = $(splitterId + "-proxy");
		this.callback = callback;
		this.orientation = orientation;
		this.handle.addEventListener("mousedown", bind(this.onHandleMousedown, this));
	};

	Splitter.prototype.onHandleMousedown = function (evt) {
		currentSplitter = this;
		this.updatePosFromEvent(this.proxy, evt);
		this.proxy.classList.remove("resize-proxy-hidden");	
		evt.preventDefault();
	};

	Splitter.prototype.afterMouseUp = function (evt) {
		this.updatePosFromEvent(this.handle, evt)
		this.proxy.classList.add("resize-proxy-hidden");
		currentSplitter = null;
	};

	Splitter.prototype.updatePosFromEvent = function (el, evt) {
		if (this.orientation == "vertical") {
			el.style.top = (evt.pageY - (SPLITTER_DIM/2)) + "px";
		} else {
			el.style.left = (evt.pageX - (SPLITTER_DIM/2)) + "px";
		}
	};

	var onDocMouseup = function (evt) {
		if (currentSplitter) {
			currentSplitter.callback(evt);
			currentSplitter.afterMouseUp(evt);
			evt.preventDefault();
		}
	};

	var onDocMousemove = function (evt) {
		if (currentSplitter) {
			currentSplitter.updatePosFromEvent(currentSplitter.proxy, evt);
			evt.preventDefault();
		}
	};

	document.addEventListener("mouseup", onDocMouseup);
	document.addEventListener("mousemove", onDocMousemove);	

	new Splitter("main-splitter", "horizontal",  function (evt) {window.iat.onMainSplitterReleased(evt.pageX - (SPLITTER_DIM/2), SPLITTER_DIM);});
	new Splitter("editors-splitter", "vertical",  function (evt) {window.iat.onEditorsSplitterReleased(evt.pageY - (SPLITTER_DIM/2), SPLITTER_DIM);});
})();