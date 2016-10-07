function response_handle() {
    var response = JSON.parse(this.responseText);
    response.query.search.forEach(function(entry) {
        var nw = document.getElementById("base-snippet").cloneNode();        
        nw.onclick = function () {window.open("https://en.wikipedia.org/wiki/" + entry.title, "_blank")};
        nw.removeAttribute("id");
        nw.style.display = "block";
        nw.innerHTML = "<h3>" + entry.title + "</h3>" + entry.snippet + "</a>";
        document.body.appendChild(nw);
    });
}
function error_handle() {
    alert("Request failed")
}
function search() {
    var wiki_request = new XMLHttpRequest(),
        search_term = document.getElementById("search_field").value;
        //search_term = "Russia";
    wiki_request.addEventListener("load", response_handle);
    wiki_request.addEventListener("error", error_handle);
    wiki_request.open("GET", "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&utf8=1&srsearch=" +
                     search_term + "&srprop=snippet|titlesnippet");
    wiki_request.setRequestHeader("Api-User-Agent", "WikipediaViewer/1.0");
    //TODO
    //Style response
    //Style search form
    wiki_request.send();
}

window.onload = function () {
    
};