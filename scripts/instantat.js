(function () {
	var currentType = "template",
		unplugged = false,
		editor = null, store = null, data_editor = null;

	var snippet = { 
        template : "{macro main()}\n    <ul>\n    {foreach fruit in data.fruits}\n        ${fruit}, test\n    {/foreach}\n    </ul>\n{/macro}" , 
        script : "{\n    $classpath:'TestScript',\n    $prototype : {\n        myMethod : function () {\n\n        }\n    }\n}" , 
        css : "{macro main()}\n    ul {\n        padding-left : 10px;\n        color:red;\n    }   \n{/macro}" , 
        data : "var data = {\n    fruits : [\"Banana\", \"Orange\", \"Apple\"]\n}"
    };

	var updateEditorSilently = function (e, content) {
		unplugged = true;
		    e.getSession().setValue(content,0);
	    unplugged = false;
	}

	var selectEditor = function (evt) {
		var previousType = currentType;
	    currentType = evt.target.innerHTML.toLowerCase(); 

	    updateEditorSilently(editor, snippet[currentType]);

	    if (currentType == "template") editor.getSession().setMode("ace/mode/html");
	    if (currentType == "script") editor.getSession().setMode("ace/mode/javascript");
	    if (currentType == "css") editor.getSession().setMode("ace/mode/css");

	   	document.getElementById("tab-" + previousType).classList.remove("tab-selected");
	    document.getElementById("tab-" + currentType).classList.add("tab-selected");

	    errors.refreshErrors();
	};

	var loadModel = function (model_content) {
	    try {
	        eval(model_content);  
			errors.removeError("data");  
	    } catch (e) {
			errors.setError("data","[DATA MODEL ERROR] : " + e.message);
	        var data = {};
	    }

	    return data;
	};

	var loadTemplate = function (tpl_content, data) {
	    var tplString = "{Template {$classpath : 'Test', $hasScript:true, $css:['TestStyle']}}"+tpl_content+"{/Template}"
	    aria.templates.TplClassGenerator.parseTemplate(tplString, false,
	        {
	            fn : function (res, args) {
	                if (res.classDef) {
						errors.removeError("template");
	                    loadTemplateInPreview(res.classDef, data);
	                } 
	            }
	        },{"file_classpath" : "Test"}
	    );
	};

	var loadTemplateInPreview = function (classDef, data) {
	    Aria["eval"](classDef); 
	    Aria.loadTemplate({
	        classpath: "Test",
	        div: "preview",
	        data: data
	    });
	};

	var loadTemplateScript = function (script_content) {
	    try {
	        eval("Aria.tplScriptDefinition("+script_content+");");
			errors.removeError("script");  
	    } catch (e) {
			errors.setError("script", "[SCRIPT ERROR] : " + e.message);
	    }
	};

	var loadTemplateStyle = function (css_content, data) {
	    var tplString = "{CSSTemplate {$classpath : 'TestStyle'}}"+css_content+"{/CSSTemplate}"
	    aria.templates.CSSClassGenerator.parseTemplate(tplString, false,
	        {
	            fn : function (res, args) {
	                if (res.classDef) {
						errors.removeError("css");  
	                    Aria["eval"](res.classDef); 
	                } else {
						errors.setError("css", "[SCRIPT ERROR] : " + e.message);
	                }
	            }
	        },{"file_classpath" : "TestStyle"}
	    );
	};

	var onEditorChange = function(){
	    if(!unplugged) {
	    	// update snippet from editors
	        snippet[currentType] = editor.getValue();
	        snippet.data = data_editor.getValue();

	    	// editors are in sync, just refresh preview
	        refreshPreview();
	    }
	};

	// Refresh editors and preview from model
	var refresh = function () {
		refreshEditors();
		refreshPreview();
	};

	var refreshEditors = function () {
	    updateEditorSilently(editor, snippet[currentType]);
	    updateEditorSilently(data_editor, snippet.data);
	};

	var refreshPreview = function () {
		var data = loadModel(snippet.data);
	    loadTemplateScript(snippet.script);
	    loadTemplateStyle(snippet.css, data);  
	    loadTemplate(snippet.template, data);

	    aria.templates.TemplateManager.unloadTemplate("Test");
	    aria.templates.CSSMgr.unloadClassPathDependencies("Test", ["TestStyle"]);
	};

	var init = function () {
		editor = ace.edit("multi-editor");
		editor.setTheme("ace/theme/idle_fingers");
		editor.setFontSize("14px");
		editor.getSession().setMode("ace/mode/html");

		data_editor = ace.edit("data-editor");
		data_editor.setFontSize("14px");
		data_editor.getSession().setMode("ace/mode/javascript");

		editor.on("change", onEditorChange);
		data_editor.on("change", onEditorChange);

		errors = new ErrorManager(editor, data_editor);

		var key = "apiKey=eHom4izItOoREUUPRPKfBNwzQdDlO-62";
		store = new MongoStore("at-snippets", "snippets", key);

		refreshUnlessIdInHash();

		aria.utils.HashManager.addCallback({
			fn : refreshUnlessIdInHash,
			scope : null
		});
	};

	var refreshUnlessIdInHash = function () {
		var hash = aria.utils.HashManager.getHashObject();
		if (hash && hash.param0) {
			var snippet_id = hash.param0;
			displayMessage("Loading " + snippet_id + " ...");
			store.get(snippet_id, loadSnippetCb);
		} else {
			refresh();	
		}
	};

	var loadSnippetCb = function (loadedSnippet, errorMessage) {
		if (loadedSnippet) {
			displayMessage("<span class='success'>Snippet "+loadedSnippet._id.$oid+" loaded</span>");

			// filter out internal properties
			delete loadedSnippet._id;

			snippet = loadedSnippet;
			refresh();	
		} else {
			aria.utils.HashManager.setHash("");	
		}
	};

	
	var messageEl = document.getElementById("general-message"), 
		messageTimeout;

	var displayMessage = function (text) {
		messageEl.innerHTML = text;
		window.clearTimeout(messageTimeout);
		messageTimeout = window.setTimeout(function () {messageEl.innerHTML=""}, 10000)
	};
	
	var save = function () {
		store.save(snippet, function (savedSnippet) {
			var id = savedSnippet._id.$oid;
			aria.utils.HashManager.setHash(id);
			window.setTimeout(function () {displayMessage("Snippet saved at <a href='#"+id+"'>#"+id+"</a>")}, 100);
		});
	};

	window.iat_selectEditor = selectEditor;
	window.iat_save = save;
	window.iat_getCurrentType = function () {return currentType};
	Aria.load({ 
		classes:["aria.utils.HashManager"], 
        oncomplete:{
    	    fn: function () {
    	    	// loading fake template to get necessary dependencies
				Aria.loadTemplate({classpath: "A",div: "preview",data:{}}, {fn : init, scope : null});
    	    }
 	    }
    });
})();