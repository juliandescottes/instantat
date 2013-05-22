// http://stackoverflow.com/a/901144/
var getQueryParamByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

// Load query params or provide defaults
var atVersion = getQueryParamByName("version") || "1.4.4";
var paramDev = getQueryParamByName('dev'), isDev = (paramDev == "true" || paramDev == 1);
var atUrl, skinUrl, ariaPath;
var basePath = '/atcdn/' + atVersion; // requires "atcdn" repo / "gh-pages" from the same user on GH
if(isDev) {
    ariaPath = basePath + '/dev/';
    atUrl    = ariaPath + 'aria/bootstrap.js';
    skinUrl  = ariaPath + 'aria/css/atskin.js';
} else {
    ariaPath = basePath + '/min/';
    atUrl    = ariaPath + 'aria/ariatemplates-' + atVersion + '.js';
    skinUrl  = ariaPath + 'aria/css/atskin-' + atVersion + '.js';
}

document.write('<scr' + 'ipt type="text/javascript" src="' + atUrl + '"></scri' + 'pt>');
document.write('<scr' + 'ipt type="text/javascript" src="' + skinUrl + '"></scri' + 'pt>');
