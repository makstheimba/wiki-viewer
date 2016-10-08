function goRandom() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}
function toTheTop() {
    window.scrollTo(0,0);
}
function keyOnSearch(event) {
    if (event.keyCode === 13) {//Enter pressed
        search();
    }
}
function focusOnSearch() {
    document.getElementById("search_field").focus();
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

function titlesInfo() {
    var response = JSON.parse(this.responseText),
        more_btn = document.getElementById("more_btn"),
        url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exlimit=10&exintro=1&titles=",
        title_info_request = new XMLHttpRequest();
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
        url += entry.title;
        url += "|"
    });
    url = url.slice(0, -1);//get rid of last '|'
    title_info_request.addEventListener("load", infoRequestHandle);
    title_info_request.open("GET", url);
    title_info_request.setRequestHeader("Api-User-Agent", "WikipediaViewer/1.0");
    title_info_request.send();   
}
function infoRequestHandle(){
    var response = JSON.parse(this.responseText),
        more_btn = document.getElementById("more_btn"),
        entry = {},
        nw = 0;
    console.log(response);
    for (var key in response.query.pages){
        entry = response.query.pages[key];
        console.log(entry);
        if (response.query.pages.hasOwnProperty(key)){
            console.log(entry.title);
            nw = document.getElementById("base-snippet").cloneNode();
            nw.onclick = function () {window.open("https://en.wikipedia.org/wiki/" + entry.title, "_blank"); };
            nw.removeAttribute("id");
            nw.className += " search-entry";
            nw.style.display = "block";
            nw.innerHTML = "<h3>" + entry.title + "</h3>" + entry.extract;        
            document.body.insertBefore(nw, document.getElementById("wrap"));            
        }
    }
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
    wiki_request.addEventListener("load", titlesInfo);
    wiki_request.open("GET", "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&utf8=1&srsearch=" +
                     search_term + "&srprop=&continue=" + cont.continue + "&sroffset=" + cont.sroffset);
    wiki_request.setRequestHeader("Api-User-Agent", "WikipediaViewer/1.0");
    wiki_request.send();
}