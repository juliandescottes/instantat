(function () {
	var $ = function (id) {return document.getElementById(id);};
	var handle = $("resize-handle");
	var proxy = $("resize-handle-proxy");
	var isDragging = false;
	var SPLITTER_H = 6;

	var resizeEditors = function (splitterPosition) {
		window.iat_updateEditorsPositions(splitterPosition, SPLITTER_H);
	};

	var onHandleMousedown = function (evt) {
		if (!isDragging) {
			isDragging = true;
			proxy.style.top = (evt.pageY - (SPLITTER_H/2)) + "px";
			proxy.classList.remove("resize-proxy-hidden");	
		}
		evt.preventDefault();
	};

	var onDocMouseup = function (evt) {
		if (isDragging) {
			isDragging = false;
			var splitterPos = {top:evt.pageY - (SPLITTER_H/2)};
			resizeEditors(splitterPos);
			handle.style.top = splitterPos.top + "px"; 
			proxy.classList.add("resize-proxy-hidden");
			evt.preventDefault();
		}
	};

	var onDocMousemove = function (evt) {
		if (isDragging) {
			proxy.style.top = (evt.pageY - (SPLITTER_H/2)) + "px";
			evt.preventDefault();
		}
	};

	handle.addEventListener("mousedown", onHandleMousedown);
	document.addEventListener("mouseup", onDocMouseup);
	document.addEventListener("mousemove", onDocMousemove);
})();