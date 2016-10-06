window.onload = function () {
    
};
function search(){
    var wiki_request = new XMLHttpRequest();
    wiki_request.addEventListener("load", response_handle());
    wiki_request.open("GET", "data/weather.json");
    wiki_request.send();
}
function response_handle(){
    console.log(this.responseText);//response is undefined
}