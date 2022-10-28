// This page has the API's as a shell to get the information we need from them
// Using the Pokemon API and Wikipedia API
var temp = 'entei';
var pokemon = temp.toLowerCase(); // entry needs to be lower case
console.log(pokemon)
// total array is 1154 of pokemon listed in the Pokemon API
// Wikipedia seems to only have pages for the first two generations 1 - 251 ** restrict to only the first 251 pokemon then state there will be future updates as wikipedia updates
// Pokemon API
// var BasePoke = `https://pokeapi.co/api/v2/pokemon/${(pokemon)}`;
var PokeObj = {};
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
console.log(PokeObj)
}
getPokemon(pokemon)
// Wikipedia API


var WikiObj = {};
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
console.log(WikiObj)
}

getWiki(pokemon)










