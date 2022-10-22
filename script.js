var searchBar = document.querySelector("#searchBar");
var searchBtn = document.querySelector("#searchBtn");
var previousSearch = document.querySelector("#previousSearches");

var API_URI = ""

function displaySearch(search) {
    // Uses the search to find the Pokemon entered by the user
    searchBtn.addEventListener("click",function (event) {
        savedSearches(search);
        window.location.herf = "nextpage.html"; // Add the next page in place of "nextpage.html"
    });
}

function savedSearches() {
    // Uses the localStorage to save the last search results
    localStorage.setItem("lastsearch",JSON.stringify()); // search results got into the ()
}

function displaySavedSearches() {
    // Displays the saved search results to the previous pokemon searches area
    var lastSearch = localStorage.getItem("lastsearch"); // vars subject to change
    if (lastSearch) {
        var parcsData = JSON.parse(lastSearch);
        previousSearch.appendChild(parcsData[""]); // Data parseDated added in the ""
    }
}

displaySavedSearches();
displaySearch(searchBar.value);