const treinador = localStorage.getItem("treinador");
preencher();

async function preencher() {
  const divTodosPokemons = document.getElementById("todos-pokemons");
  const todosPokemons = await pegarTodosPokemons(treinador);
  let htmlOnePokemon = ``; 

  console.log(todosPokemons);

  if (!todosPokemons) {
    return console.log("deu erro");
  }

  for (let i = 0; i < todosPokemons.length; i++) {
    console.log(todosPokemons[i].id_pokemon);
    htmlOnePokemon += makeHtmlOnePokemon(todosPokemons[i].id_pokemon);

    if (!((i + 1) % 4) && i != 0) {
      console.log("entrei " + i);
    }
  }

  if ((todosPokemons.length + 1) % 4) {
    htmlOnePokemon = htmlOnePokemon;
  }

  divTodosPokemons.innerHTML += htmlOnePokemon;
}

async function pegarTodosPokemons(treinador) {
  let data;
  await fetch(`https://teste-pokemon-crud.herokuapp.com/pokemons/${treinador}`)
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
  return data;
}

function makeHtmlOnePokemon(id) {
  const htmlOnePokemon = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
                            <div
                              class="
                                bg-pokedex
                                py-5
                                d-flex
                                border
                                rounded
                                align-items-center
                                flex-column
                              "
                            >
                              <img
                                class="img-fluid"
                                style="width: 70%; max-width: 15rem"
                                src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
                                  "00" + id
                                ).slice(-3)}.png"
                                alt=""
                              />

                              <button
                                type="button"
                                class="btn btn-outline-light mt-3"
                                onclick="detalhes(${id})"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDetalhes"
                              >
                                Detalhes
                              </button>
                            </div>
                          </div>`;

  return htmlOnePokemon;
}

async function detalhes(id) {
  const jsonPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(async (res) => {
      return (data = await res.json());
    })
    .catch((err) => {
      return console.log(err);
    });

  const nomePokemonHTML = document.getElementById("nome-pokemon");
  nomePokemonHTML.innerText = jsonPokemon.name.capitalize();

  const imagePokemonHTML = document.getElementById("image-pokemon");
  imagePokemonHTML.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
    "00" + id
  ).slice(-3)}.png`;

  const barrazinhas = document.querySelectorAll(".barrinhas-status");
  const atributos = document.querySelectorAll(".valor-status");

  for (var i = 0; i <= 5; i++) {
    atributos[i].textContent = `: ${jsonPokemon.stats[i].base_stat}`;
    barrazinhas[i].style.width =
      calculaPorcentagemDabarra(jsonPokemon.stats[i].base_stat) + "%";
  }

  const cardPokemon = document.getElementById("card-pokemon");
  const classePrimariaPokemon = jsonPokemon.types[0].type.name;
  cardPokemon.style.backgroundColor =
    colorsBackgroundByClass[classePrimariaPokemon];
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function calculaPorcentagemDabarra(a) {
  return (Math.log10(a / 2.55) * 100) / 2;
}

const colorsBackgroundByClass = {
  grass: "#BEFFEF",
  fire: "#FFA99D",
  water: "#9DEDFF",
  poison: "#C29DFF",
  psychic: "#FFF9BE",
  ground: "#c0aa98",
  electric: "#f9d11e",
  flying: "#f6f6f6",
  ice: "#cfe5f3",
  bug: "#b9d446",
  dark: "#333333",
  dragon: "#6f6d3d",
  fairy: "#de5b8f",
  fighting: "#fda14e",
  ghost: "#9a57ff",
  rock: "#ee9c38",
  steel: "#c6dce7",
  normal: "#D3D3D3",
};
