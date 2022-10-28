// secondscript

console.log('testing')

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pokemon').toLowerCase();

console.log(myParam)

// START 2ND JS FILE
    console.log('TEST')
    getPokemon(myParam) // API search function from Pokemon API
    getWiki(myParam)
    savedSearches(myParam);
    PokeStuff()

var PokeObj = {};
var WikiObj = {};

function savedSearches(pokemon) {
    // Uses the localStorage to save the last search results

    localStorage.setItem("lastsearch",JSON.stringify(pokemon)); // search results got into the ()
}

function displaySavedSearches() {
    // Displays the saved search results to the previous pokemon searches area
    var lastSearch = localStorage.getItem("lastsearch"); // vars subject to change
    if (lastSearch) {
        var parcsData = JSON.parse(lastSearch);
        previousSearch.appendChild(parcsData[""]); // Data parseDated added in the ""
    }
}

// displaySavedSearches();
function PokeStuff() {
    var PokeInfo = JSON.parse(localStorage.getItem("Poke-Facts"))
    var WikiInfo = JSON.parse(localStorage.getItem("Wiki-Facts"))

    document.querySelector("#pokename").innerHTML = PokeInfo.Name;
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
    }
    // pokesprite = data.sprites.front_default; // Pulling sprite from Pokemon API for Pokemon Search
    // console.log(pokesprite);
    // // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/129.png"

    // $('#pokeimg').attr('src',pokesprite);
    // $('#pokeimg').attr('alt',`Sprite of ${pokemon} pulled from Pokemon API`)
    // $('#pokeimg').attr('style','height:240px; weight:240px')
})
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
