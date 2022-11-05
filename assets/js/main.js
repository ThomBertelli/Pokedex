
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailCardRefeerence = document.getElementById('detailCard')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        
    <li onclick="getCard(this)"  id="${pokemon.name}"class="pokemon ${pokemon.type} pokemonli">
        <a  >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            </a>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});


function getCard(e){

    detailCardRefeerence.style.display = "flex"
    pokeApi.getOnePokemon(e.id).then((pokemon)=>{
        const newCard = fillCard(pokemon)
        detailCardRefeerence.innerHTML = newCard
    } )  
}

function fillCard(pokemon){
    return `   
    
    <div onclick="showHide()" class="pokemon ${pokemon.type} details-card">
    <div>
        <span class="card-number">#${pokemon.number}</span>
        <span class="card-name">${pokemon.name}</span>
    </div> 
       
    <div>
        <img class="img-card" src="${pokemon.photo}"
        alt="${pokemon.name}">
    </div>

    <div class="card-type">
        <span> ${pokemon.types.map((type) => `<li class="type ${type} card"> ${type}</li>`).join('')}</span>
    </div>  
    <div class="stats">
        <span> Height: ${pokemon.height} '</span>
        <span> Weight: ${pokemon.weight} lbs</span>
    </div>

    <h4>Abilities</h4>
    <div class="abilities">
        
        <span>${pokemon.abilities.map((ability) => `<li >${ability}</li>`).join('')} </span>

    </div>
    </div>
    `
}

function showHide() {
    
    if (detailCardRefeerence.style.display === "none") {
        detailCardRefeerence.style.display = "flex";
    } else {
        detailCardRefeerence.style.display = "none";
    }
  }


