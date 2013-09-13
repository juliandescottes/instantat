(function (exports) {
  // SETTINGS //
  var CURRENT_VERSION = 1,
    ACE_THEME = "ace/theme/monokai",
    ACE_FONT_SIZE = "14px",
    MONGO_KEY = "apiKey=eHom4izItOoREUUPRPKfBNwzQdDlO-62";

  var $ = function (id) {return document.getElementById(id);};
  var currentType = "template",
    unplugged = false,
    editor = null, store = null, data_editor = null;

  /**
   * Backward compatibility of snippet model
   * - version `0` : Simplified template, script, etc ... Need to add overhead
   */
  var snippet = { 
    template : $("template-content").innerHTML, 
    script : $("script-content").innerHTML, 
    css : $("css-content").innerHTML, 
    data : $("data-content").innerHTML,
    version : 1
  };

  var updateEditorSilently = function (e, content) {
    unplugged = true;
    e.getSession().setValue(content,0);
    unplugged = false;
  };

  var selectEditor = function (evt) {
    var previousType = currentType;
    currentType = evt.target.innerHTML.toLowerCase(); 

    updateEditorSilently(editor, snippet[currentType]);

    if (currentType == "template") editor.getSession().setMode("ace/mode/aria");
    if (currentType == "script") editor.getSession().setMode("ace/mode/javascript");
    if (currentType == "css") editor.getSession().setMode("ace/mode/aria");

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
    aria.templates.TplClassGenerator.parseTemplate(tpl_content, false,
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
    aria.core.ClassMgr.$on({
      "classComplete": {
        fn : onTemplateLoaded, args: data, scope : window
      }
    });
    Aria["eval"](classDef);
  };

  var loadTemplateScript = function (script_content) {
    try {
      eval(script_content);
      errors.removeError("script");  
    } catch (e) {
      errors.setError("script", "[SCRIPT ERROR] : " + e.message);
    }
  };

  var onTemplateLoaded = function(evt, data){
    if (evt.refClasspath == "Test") {
      Aria.loadTemplate({
        classpath: "Test",
        div: "preview",
        data: data
      });
      

      aria.core.ClassMgr.$removeListeners({
        "classComplete": {
          fn : onTemplateLoaded, scope : window
        }
      });
    }
  };

  var loadTemplateStyle = function (css_content, data) {
    aria.templates.CSSClassGenerator.parseTemplate(css_content, false, 
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
    try {
      aria.templates.TemplateManager.unloadTemplate("Test");
      aria.templates.CSSMgr.unloadClassPathDependencies("Test", ["TestStyle"]);
    } catch (Oo) {
      // I can haz lazyness
    }
    
    loadTemplateScript(snippet.script);
    loadTemplateStyle(snippet.css, data);  
    loadTemplate(snippet.template, data);
  };

  /**
   * ACE Editor helper to change the shortcut for an existing built-ins command.
   * The exec handler will be taken from the existing command. Will log an error if the command does not exist. 
   * @param {Editor} editor Ace editor to update
   * @param {String} commandName 
   * @param {String} winShortcut/macShortcut shortcuts for Win/Mac (eg "Ctrl+L", "Command+G")
   * @return {Boolean} true only if the command was successfully added
   */
  var reassignCommand = function (editor, commandName, winShortcut, macShortcut) {
    var prevCommand = editor.commands.byName[commandName]; 
    if (typeof prevCommand == "undefined") {
      console.error("[instantAt:reassignCommand]Command " + cmdName + " does not exist.");
      return false;
    } else {
      // addCommand will remove the command before creating the new one
      editor.commands.addCommand({
        name: commandName,
        bindKey: {win : winShortcut, mac : macShortcut},
        exec: prevCommand.exec,
        readOnly: prevCommand.readOnly
      })
      return true;
    }
  };

  var init = function () {
    editor = ace.edit("multi-editor");
    editor.setTheme(ACE_THEME);
    editor.setFontSize(ACE_FONT_SIZE);
    editor.getSession().setMode("ace/mode/aria");

    data_editor = ace.edit("data-editor");
    data_editor.setFontSize(ACE_FONT_SIZE);
    data_editor.getSession().setMode("ace/mode/javascript");

    reassignCommand(editor, "gotoline", "Ctrl-G", "Command-G");
    reassignCommand(data_editor, "gotoline", "Ctrl-G", "Command-G");

    editor.on("change", onEditorChange);
    data_editor.on("change", onEditorChange);

    errors = new ErrorManager(editor, data_editor);

    store = new MongoStore("at-snippets", "snippets", MONGO_KEY);

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
      var snippetVersion = loadedSnippet.version || 0;
      if (snippetVersion < CURRENT_VERSION) {
        loadedSnippet = exports.convertSnippet(loadedSnippet, snippetVersion);
      }
      snippet = loadedSnippet;
      refresh();
    } else {
      aria.utils.HashManager.setHash(""); 
    }
  };

  var messageEl = document.getElementById("tabpanel-message"), 
    messageTimeout;

  var displayMessage = function (text) {
    messageEl.innerHTML = text;
    window.clearTimeout(messageTimeout);
    messageTimeout = window.setTimeout(function () {messageEl.innerHTML=""}, 10000)
  };
  
  var save = function () {
    snippet.version = CURRENT_VERSION;
    store.save(snippet, function (savedSnippet) {
      var id = savedSnippet._id.$oid;
      aria.utils.HashManager.setHash(id);
      window.setTimeout(function () {displayMessage("Snippet saved at <a href='#"+id+"'>#"+id+"</a>")}, 100);
    });
  };


  var setPositionInPx = function (elem, posName, value) {
    elem.style[posName] = value + "px";
  } 

  var onEditorsSplitterReleased = function (top, splitterDim) {
    setPositionInPx($("multi-editor"), "height", top - 30);
    setPositionInPx($("data-editor"), "top", top + splitterDim + 1);
    $("data-editor").style.height = "auto";
    
    editor.resize();
    data_editor.resize();
  };

  var onMainSplitterReleased = function (left, splitterDim) {
    setPositionInPx($("editors-container"), "width", left);
    setPositionInPx($("preview"), "left", left + splitterDim + 1);
    
    editor.resize();
    data_editor.resize();
  };

  aria.core.AppEnvironment.setEnvironment({
    defaultWidgetLibs : {
      "aria" : "aria.widgets.AriaLib", 
      "html" : "aria.html.HtmlLibrary",   
      "touch" : "aria.touch.widgets.TouchWidgetLib"
    }
  });

  Aria.load({
    classes:["aria.utils.HashManager", "aria.templates.CSSClassGenerator"],
    oncomplete:{
      fn: function () {
        // loading fake template to get necessary dependencies
        Aria.loadTemplate({classpath: "A",div: "preview",data:{}}, {fn : init, scope : null});
      }
    }
  });
  
  exports.iat = {
    selectEditor : selectEditor,
    save : save,
    onEditorsSplitterReleased : onEditorsSplitterReleased,
    onMainSplitterReleased : onMainSplitterReleased,
    getCurrentType : function () {return currentType}
  };
})(window);