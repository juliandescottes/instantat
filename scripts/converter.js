/**
 * Convert old versions of instantat snippets to the current format
 */
(function (exports) {
  var beforeTemplate = "{Template {\n\t$classpath : 'Test',\n\t$hasScript:true,\n\t$css:['TestStyle']\n}}\n\t";
  var afterTemplate = "\n{/Template}";

  var beforeCss = "{CSSTemplate {\n\t$classpath : 'TestStyle'\n}}\n\t";
  var afterCss = "\n{/CSSTemplate}";

  var indent = function (str) {
    return str.replace(/\n/g,"\n\t");
  };

  var tabToWhitespace = function (str) {
    return str.replace(/\t/g,"    ");
  };

  exports.convertSnippet = function (snippet, version) {
    if (version == 0) {
      var convertedSnippet = {};
      convertedSnippet.template = tabToWhitespace(beforeTemplate+indent(snippet.template)+afterTemplate);
      convertedSnippet.script = "Aria.tplScriptDefinition"+snippet.script+";";
      convertedSnippet.css = tabToWhitespace(beforeCss+indent(snippet.css)+afterCss);
      convertedSnippet.data = snippet.data;
      return convertedSnippet;
    } else {
      throw 'Unsupported snippet version : ' + version;
    }
  }
})(window);