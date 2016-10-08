function response_handle() {
    var response = JSON.parse(this.responseText),
        more_btn = document.getElementById("more_btn");
    console.log(response);
    if (response.hasOwnProperty("continue")){
        more_btn.onclick = function () {search(response.continue)};
        more_btn.style.display = "inline-block";
    }
    else {
        more_btn.style.display = "none";
    }
    document.getElementById("totop_btn").style.display = "inline-block";
    response.query.search.forEach(function (entry) {
        var nw = document.getElementById("base-snippet").cloneNode();
        nw.onclick = function () {window.open("https://en.wikipedia.org/wiki/" + entry.title, "_blank"); };
        nw.removeAttribute("id");
        nw.className += " search-entry";
        nw.style.display = "block";
        nw.innerHTML = "<h3>" + entry.title + "</h3>" + entry.snippet;        
        document.body.insertBefore(nw, document.getElementById("wrap"));
    });
}

function goRandom() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}
function toTheTop() {
    window.scrollTo(0,0);
}

function clearPage() {
    var search_entry = document.getElementsByClassName("search-entry");
    document.getElementById("more_btn").style.display = "none";
    document.getElementById("totop_btn").style.display = "none";
    
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
function search(cont = {"continue": "", "sroffset": ""}) {
    var wiki_request = new XMLHttpRequest(),
        search_term = document.getElementById("search_field").value;
    if (searchTermInvalid(search_term)) {
        return;
    }
    if (cont.continue === ""){
        clearPage();
    }
    wiki_request.addEventListener("load", response_handle);//sroffset
    wiki_request.open("GET", "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&utf8=1&srsearch=" +
                     search_term + "&srprop=snippet|titlesnippet&continue=" + cont.continue + "&sroffset=" + cont.sroffset);
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