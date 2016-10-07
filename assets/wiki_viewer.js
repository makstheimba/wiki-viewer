//TODO: 
//Show more items
//Styling at small screens

function response_handle() {
    var response = JSON.parse(this.responseText);
    console.log(response);
    response.query.search.forEach(function (entry) {
        var nw = document.getElementById("base-snippet").cloneNode();
        nw.onclick = function () {window.open("https://en.wikipedia.org/wiki/" + entry.title, "_blank"); };
        nw.removeAttribute("id");
        nw.className += " search-entry";
        nw.style.display = "block";
        nw.innerHTML = "<h3>" + entry.title + "</h3>" + entry.snippet;
        document.body.appendChild(nw);
    });
}

function goRandom() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}
function clearPage() {
    var search_entry = document.getElementsByClassName("search-entry");
    while (search_entry[0]) {
        search_entry[0].parentNode.removeChild(search_entry[0]);
    }
}
function searchTermInvalid(st) {
    if (st === "") {
        clearPage();
        return true;
    } else if (st.length > 30) {
        document.getElementById("search_field").value = "";
        alert("Invalid request");
        return true;
    }
    return false;
}
function search() {
    var wiki_request = new XMLHttpRequest(),
        search_term = document.getElementById("search_field").value;
    if (searchTermInvalid(search_term)) {
        return;
    }
    clearPage();
    wiki_request.addEventListener("load", response_handle);//sroffset
    wiki_request.open("GET", "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&utf8=1&srsearch=" +
                     search_term + "&srprop=snippet|titlesnippet&continue=&sroffset=");
    wiki_request.setRequestHeader("Api-User-Agent", "WikipediaViewer/1.0");
    wiki_request.send();
}

function keyOnSearch(event) {
    if (event.keyCode === 13) {//Enter pressed
        search();
    }
}
function focusOnSearch() {
    document.getElementById("search_field").focus();
}
window.onload = function () {
    
};