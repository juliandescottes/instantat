var domId = 'hints1';
var localStorageKey = 'hints1hide';

if(localStorage.getItem(localStorageKey) == null) {
    var container = document.createElement("DIV");
    container.id = domId;

    container.innerHTML = '<strong>Hint:</strong> you can pass <code>dev=1</code> in the query string to load unminified AT files\
        and <code>version=x.x.x</code> to load specific AT version (<a href="/instantat/?dev=1&version=1.4.4">example</a>)\
        <a id="hideHints" href="javascript:void(0)">Got it, never display again</a>';
    document.documentElement.appendChild(container);

    document.getElementById('hideHints').addEventListener('click', function(){
        document.getElementById(domId).style.display = 'none';
        localStorage.setItem(localStorageKey, 1);
    });
}
