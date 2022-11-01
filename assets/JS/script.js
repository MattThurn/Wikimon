var searchBar = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-button");
var previousSearch = document.querySelector("#previous-searches");


if (localStorage.getItem('lastsearch') !== null) {
    var Searches = JSON.parse(localStorage.getItem('lastsearch'));
} else {
    var Searches = [];
} 

var SearchPageObj = {};
// Uses the search to find the Pokemon entered by the user
searchBtn.addEventListener("click",function () {  
    var temp = searchBar.value;
    var pokemon = temp.toLowerCase();
    getPokemon(pokemon)
    // Searches.push(pokemon);
    // savedSearches(Searches);
    window.location = `./landing.html?pokemon=${pokemon}`;
    // // START 2ND JS FILE
    // console.log('TEST')
    // getPokemon(pokemon) // API search function from Pokemon API
    // getWiki(pokemon)
    // savedSearches(pokemon);
    // PokeStuff()
});

// Previous Searches tile button listener

function savedSearches(pokemon) {
    // Uses the localStorage to save the last search results
    localStorage.setItem("lastsearch",JSON.stringify(pokemon)); // search results got into the ()
}


function displaySavedSearches() {
    // Displays the saved search results to the previous pokemon searches area
    var count = 1;
    for (let i=(Searches.length-1); i>Searches.length-4; i--) {
            if (Searches[i] !== undefined) {
            $(`#prevname${count}`).text(Searches[i].Name)
            $(`#previmg${count}`).attr('src',Searches[i].Sprite)
            console.log(i)
            console.log(count)
            count++
    }
}

}
displaySavedSearches()



//fetchin information -- 
async function getPokemon(pokemon) {
    var BasePoke = `https://pokeapi.co/api/v2/pokemon/${(pokemon)}`;
    // var BasePoke = `https://pokeapi.co/api/v2/pokemon?limit=2000`;
    await fetch(BasePoke)
        .then((response) => response.json())
        .then(function(data) {;
            Searches.push({Name: pokemon, Sprite: data.sprites.front_default})
})
savedSearches(Searches)
}
// getPokemon(pokemon)
// // Wikipedia API



// async function getWiki(pokemon) {
// var BaseWiki = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=pokemon ${pokemon}&limit=5`;

// await fetch(BaseWiki)
// .then((response) => response.json())
// .then(function(data) {
//     console.log(data)
//     for (let i=0; i < 5; i++) {
//         WikiObj[i] = {
//             Key: data.pages[i].key,
//             Description: data.pages[i].description
//         }
//     }
 
// })
// localStorage.setItem("Wiki-Facts",JSON.stringify(WikiObj))
// }









