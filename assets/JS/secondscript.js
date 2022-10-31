// secondscript
var searchBtn = document.querySelector("#search-button");
var searchBar = document.querySelector("#search-input");
var previousSearch = document.querySelector("#previous-searches");

var urlParams = new URLSearchParams(window.location.search); // Search parameters in URL
var myParam = urlParams.get('pokemon').toLowerCase(); // Ensuring it's in all lowercase for search API's

console.log(myParam)



// Displaying information when searching for another pokemon on the landing page
searchBtn.addEventListener("click",function () {  
    var temp = searchBar.value;
    var pokemon = temp.toLowerCase();

    // START 2ND JS FILE
    console.log('TEST')
    getPokemon(pokemon) // API search function from Pokemon API
    getWiki(pokemon)
    savedSearches(pokemon);
    PokeStuff()
});

// START 2ND JS FILE ----------------------------------------------------
if (myParam !== null) {

    console.log('TEST')
    getPokemon(myParam) // API search function from Pokemon API
    getWiki(myParam) // API search function from Wiki API
    savedSearches(myParam); // Saves the last Pokemon searched to local storage
    PokeStuff()
}

var PokeObj = {};
var WikiObj = {};

var Searches = [];
function savedSearches(pokemon) { // Uses the localStorage to save the last search results
    if (pokemon !== null) {     
        localStorage.setItem("lastsearch",JSON.stringify(Searches)); // search results got into the ()
}
}

function displaySavedSearches() {
    // Displays the saved search results to the previous pokemon searches area
    var lastSearch = localStorage.getItem("lastsearch"); // vars subject to change
    if (lastSearch) {
        var parcsData = JSON.parse(lastSearch);
        previousSearch.appendChild(parcsData[""]); // Data parseDated added in the ""
    }
    console.log(previousSearch)
}

// Displaying information from local storage
function PokeStuff() {
    var PokeInfo = JSON.parse(localStorage.getItem("Poke-Facts"))
    var WikiInfo = JSON.parse(localStorage.getItem("Wiki-Facts"))

    // Pokemon Name
    document.querySelector("#pokename").innerHTML = PokeInfo.Name;

    //Pokemon Sprite
    var PokeImg = $('<img>').attr('src',PokeInfo.Sprite);
    PokeImg.attr('alt',`${PokeInfo.Name} sprite`);
    PokeImg.attr('style','height:100%; width:100%').appendTo('#ImgCont');

    // Pokemon Stats
    $('<p>').text(`HP: ${PokeInfo.HP}`).appendTo('#stats')
    $('<p>').text(`Attack: ${PokeInfo.Attack}`).appendTo('#stats')
    $('<p>').text(`Defense: ${PokeInfo.Defense}`).appendTo('#stats')
    $('<p>').text(`Spc Atk: ${PokeInfo.SpecialAtt}`).appendTo('#stats')
    $('<p>').text(`Spc Def: ${PokeInfo.SpecialDef}`).appendTo('#stats')
    $('<p>').text(`Speed: ${PokeInfo.Speed}`).appendTo('#stats')

    // Type
    $('<p>').text(`Type 1: ${PokeInfo.Type1}`).appendTo('#type')
    $('<p>').text(`Type 2: ${PokeInfo.Type2}`).appendTo('#type')

    // Wiki Stuff Added
    var j = 0;
    for (i = 0; i < 5; i++) {
        j = i+1;
        $(`#wikiT${j}`).text(`Title: ${WikiInfo[i].Key}`) // Title
        $(`#wikiD${j}`).text(`Description: ${WikiInfo[i].Description}`) // Website
        $(`#wikiW${j}`).attr('href',`https://en.wikipedia.org/wiki/${WikiInfo[i].Key}`).text(`Wiki Link: https://en.wikipedia.org/wiki/${WikiInfo[i].Key}`)
    }
}



// COPY AND PASTE FROM MATT'S JS
// This page has the API's as a shell to get the information we need from them
// Using the Pokemon API and Wikipedia API
 // entry needs to be lower case

// total array is 1154 of pokemon listed in the Pokemon API
// Wikipedia seems to only have pages for the first two generations 1 - 251 ** restrict to only the first 251 pokemon then state there will be future updates as wikipedia updates
// Pokemon API
// var BasePoke = `https://pokeapi.co/api/v2/pokemon/${(pokemon)}`;

async function getPokemon(pokemon) {
    var BasePoke = `https://pokeapi.co/api/v2/pokemon/${(pokemon)}`;
    // var BasePoke = `https://pokeapi.co/api/v2/pokemon?limit=2000`;
    await fetch(BasePoke)
        .then((response) => response.json())
        .then(function(data) {
    console.log(data);
    PokeObj = {
        Name: pokemon,
        Number: data.id,
        Sprite: data.sprites.front_default,
        HP: data.stats[0].base_stat,
        Attack: data.stats[1].base_stat,
        Defense: data.stats[2].base_stat,
        SpecialAtt: data.stats[3].base_stat,
        SpecialDef: data.stats[4].base_stat,
        Speed: data.stats[5].base_stat,
        Type1: data.types[0].type.name,
        Type2: (data.types).length !== 2 ? "none" : data.types[1].type.name
    }
    
    // pokesprite = data.sprites.front_default; // Pulling sprite from Pokemon API for Pokemon Search
    // console.log(pokesprite);
    // // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/129.png"

    // $('#pokeimg').attr('src',pokesprite);
    // $('#pokeimg').attr('alt',`Sprite of ${pokemon} pulled from Pokemon API`)
    // $('#pokeimg').attr('style','height:240px; weight:240px')
})
console.log(PokeObj)
localStorage.setItem("Poke-Facts",JSON.stringify(PokeObj))
}
// getPokemon(pokemon)
// Wikipedia API



async function getWiki(pokemon) {
var BaseWiki = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=pokemon ${pokemon}&limit=5`;

await fetch(BaseWiki)
.then((response) => response.json())
.then(function(data) {
    console.log(data)
    for (let i=0; i < 5; i++) {
        WikiObj[i] = {
            Key: data.pages[i].key,
            Description: data.pages[i].description
        }
    }
 
})
localStorage.setItem("Wiki-Facts",JSON.stringify(WikiObj))
}
