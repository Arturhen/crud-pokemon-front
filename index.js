const q = (el) => document.querySelector(el);

const form = document.querySelector(".form-pokemon");
const botaoExcluir = document.getElementById("btn-excluir-pokemon");

form.addEventListener("submit", async (event) => {
  const nomeTreinador = q(".form-crud-pokemon-nome-treinador");
  const idPokemon = q(".form-crud-pokemon-nome-pokemon");
  const dataCaptura = q(".form-crud-pokemon-data");
  const localCaptura = q(".form-crud-pokemon-local");

  const dados = JSON.stringify({
    nome_treinador: nomeTreinador.value,
    id_pokemon: idPokemon.value,
    data_captura: dataCaptura.value,
    local_captura: localCaptura.value,
  });
  event.preventDefault();

  await fetch("https://teste-pokemon-crud.herokuapp.com/pokemons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dados,
  })
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => {
      console.log(err);
    });

  nomeTreinador.value = "";
  idPokemon.value = "";
  dataCaptura.value = "";
  localCaptura.value = "";
});

botaoExcluir.addEventListener("click", async function () {
  let registroExcluir = document.getElementById("registro-excluir");
  await fetch(`https://teste-pokemon-crud.herokuapp.com/pokemons/${registroExcluir.value}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => console.log(err));
});

const inputPokemonID = document.getElementById("pokemon-id-input");

inputPokemonID.addEventListener("change", () => {
  const idPokemon = inputPokemonID.value;

  if (idPokemon < 0 || idPokemon > 798) {
    inputPokemonID.value = "";
    return;
  }

  const imagePokemonPrincipal = document.getElementById("image-pokemon-1");
  const imagePokemonSecundaria = document.getElementById("image-pokemon-2");
  const imagePokemonTercearia = document.getElementById("image-pokemon-3");

  imagePokemonPrincipal.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
    "00" + idPokemon
  ).slice(-3)}.png`;

  imagePokemonSecundaria.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;
  imagePokemonTercearia.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${idPokemon}.png`;
});

const botaoParaPokedex = document.getElementById("ir-pag-pokemons");

botaoParaPokedex.addEventListener("click", () => {
  const nomeTreinador = document.getElementById("treinador-nome").value;
  localStorage.setItem("treinador", nomeTreinador);
  window.location.href = "pokedex.html";
});

const inputTrainer = document.getElementById("pokemon-trainer-input");

inputTrainer.addEventListener("change", async () => {
  const outrosPokemonsImagem = document.querySelectorAll(
    ".imagem-outro-pokemon"
  );

  if (inputTrainer.value == "") {
    outrosPokemonsImagem.forEach((element) => {
      element.src =
        "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/fd31be8c8735550.png";
    });
    return;
  }

  const dados = await pegarTodosPokemons(inputTrainer.value);

  for (let i = 0; i < 4; i++) {
    if (dados.length < i + 1) {
      outrosPokemonsImagem[
        i
      ].src = `https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/fd31be8c8735550.png`;
      continue;
    }
    outrosPokemonsImagem[
      i
    ].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados[i].id_pokemon}.png`;
  }
});

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
