
function getRandomPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomPokemonName = data.results[randomIndex].name;
      return fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonName}`);
    })
    .then(response => response.json())
    .then(pokemonData => {
      const pokemonContainer = document.getElementById("pokemon-container");
      pokemonContainer.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        <p><strong>Type(s):</strong> ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Height:</strong> ${pokemonData.height / 10}m</p>
        <p><strong>Weight:</strong> ${pokemonData.weight / 10}kg</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.getElementById("update-pokemon").addEventListener("click", getRandomPokemon);

getRandomPokemon();
