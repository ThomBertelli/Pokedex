
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [ability] = abilities
    
    pokemon.abilities = abilities;
    pokemon.ability = ability
    
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;
        
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        
}

pokeApi.getPokemons = (offset = 0, limit = 5 ) => {
    if(window.innerWidth >= 768 && window.innerWidth < 1024){
        limit = 6
    }if(window.innerWidth >=1024){
        limit = 8
    }
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getOnePokemon = (pokemonName) =>{
    const url =  `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}       

