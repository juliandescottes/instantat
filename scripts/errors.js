/************* ERRORS *******************/
var ErrorManager = function (editor, data_editor) {
	this.errors = {
		template : false,
		script : false,
		css : false,
		data : false
	};
	this.tooltipEl = document.getElementById("error-tooltip");
	this.__hackConsoleError();
	this.editor = editor;
	this.data_editor = data_editor;
};

ErrorManager.TOOLTIP_DURATION = 2500;

ErrorManager.prototype.setError = function (type, content) {
	this.errors[type] = content;
	this.refreshErrors();
};

ErrorManager.prototype.removeError = function (type) {
	this.setError(type, false);
};


ErrorManager.prototype.refreshErrors = function () {
	var type = iat_getCurrentType();
	this.updateAnnotations(this.errors[type], this.editor);
	this.updateAnnotations(this.errors.data, this.data_editor);
	this.updateErrorTooltip(this.errors[type], this.editor);
	this.updateTabs(this.errors[type], this.editor);
};

ErrorManager.prototype.updateErrorTooltip = function (error, editor) {
	if (error) {
		var clientRect = document.getElementsByClassName("ace_cursor")[0].getBoundingClientRect();
		this.tooltipEl.innerHTML = error;
		this.tooltipEl.style.top = (clientRect.bottom+10) + "px";
		this.tooltipEl.style.left = (clientRect.left-30) + "px";
		this.tooltipEl.style.display = "block";

		window.clearTimeout(this._ttrm_timer);
		var el = this.tooltipEl;
		this._ttrm_timer = window.setTimeout(
			function () {
				el.style.display = "none";
			}, 
			ErrorManager.TOOLTIP_DURATION
		);
	} else {
		window.clearTimeout(this._ttrm_timer);
		this.tooltipEl.style.display = "none";
	}
};

ErrorManager.prototype.updateAnnotations = function (error, aceEditor) {
	if (error) {
		var errorLines = this.extractErrorLines(error),
			annotations = [];
		for (var i = 0 ; i < errorLines.length ; i++) {
			annotations.push({
			  row: errorLines[i] - 1, column: 1,
			  text: error, type: "error" 
			});
		}
		if (!annotations.length) {
			annotations.push({
			  row: 0, column: 1,
			  text: error, type: "error" 
			});
		} 

		aceEditor.getSession().setAnnotations(annotations);	
	} else {
		aceEditor.getSession().clearAnnotations();
	}
};

ErrorManager.prototype.updateTabs = function () {
	var TABS = ["template", "css", "script"];
	for (var i = 0 ; i < TABS.length ; i++) {
		var type = TABS[i];
		if (this.errors[type]) {
	   		document.getElementById("tab-" + type).classList.add("tab-error");
	    } else {
	    	document.getElementById("tab-" + type).classList.remove("tab-error");
	    }
	}
}

ErrorManager.prototype.extractErrorLines = function (error) {
	var lines = [], matches, 
		re = /line (\d+)/g;

	while (matches = re.exec(error)) {
		lines.push(matches[1]);
	}

	return lines;
};

ErrorManager.prototype.__hackConsoleError = function () {
	var errorbkp = console.error;
	var self = this;
	console.error = function (message, originalError) {
		console.log(arguments);
		if (/(Test|Parser|ClassGenerator)\]/.test(message))  {
			if (originalError && originalError.message) message = originalError.message;
			if (/CSS/.test(message)) {
				self.setError("css",message);	
			} else {
				self.setError("template",message);
			}
			
		}
		errorbkp.apply(this, arguments);
	}
};