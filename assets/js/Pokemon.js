const button = document.getElementById("buscador");

button.addEventListener("click", (e) => {
  let DataPokemon = document.getElementById("youPokemon").value;

  optionAxios("searchOnePokemon", DataPokemon);
});

function optionAxios(action, name, index) {

  let url = "";

  if (action === "searchOnePokemon") {
    url = `https:pokeapi.co/api/v2/pokemon/${name}`;
    axiosUrl(action, url, null);
  } else if (action === "searchAllTypePokemon") {
    url = `https:pokeapi.co/api/v2/type/${name}`;
    axiosUrl(action, url, null);
  } else if (action === "searchAllType") {
    url = "https:pokeapi.co/api/v2/type/";
    axiosUrl(action, url, null);
  } else if (action === "getAllPokemonForType") {
    url = name;
    axiosUrl(action, url, index);
  }
}

function axiosUrl(action, url, index) {
  axios
    .get(url, { responseType: "json" })
    .then((response) => {
      res = response.data;

      if (action === "searchOnePokemon") {
        showPokemon(response, "searchOnePokemon", null);
      } else if (action === "searchAllTypePokemon") {
        typePokemonResult(res.pokemon);
      } else if (action === "searchAllType") {
        typePokemonList(res.results);
      } else if (action === "getAllPokemonForType") {
        showPokemon(response, "getAllPokemonForType", index);
      }
    })
    .catch((error) => {
      if (action === "searchAllTypePokemon"){
        
      }
      else if (action === "searchOnePokemon"){
        showError(error);
      }
    });
}

function showPokemon(response, action, index) {
  
  res = response.data;

  if (action === "searchOnePokemon") {
    let x = document.getElementById("infoPokemon");
    x.innerHTML = `
    <div id="infoPokemonHidden">
    <div class="row" id="namepokemon">
    <section  class="col-4 ">
    <img id="imgPokemon" class="bg-${res.types[0].type.name} " src="${res.sprites.front_default}">
   </section>
  
    <section class="col-6 m-2 mt-3">
      <h4>${res.name}</h4>
      <p>Pokedex Id: ${res.id}</p>
      <p>Experiencia base: ${res.base_experience}</p>
    </section>

    </div>

    <div class="row datapokemon">
      <section class="col-5 container-fluid justify-content-center">
        <p>Weight: ${res.weight} lbs</p>
        <p>Height: ${res.height} ft</p>

          <p class="card-text">Types:</p>
        <section class="" id="infoType"></section>
        
        <ul class="container-fluid">Stats:</ul>
        <li>HP:${res.stats[0].base_stat}</li>
        <li>Attack: ${res.stats[1].base_stat}</li>
        <li>Defense: ${res.stats[2].base_stat}</li>

     </section>
      <section class="col-6">
      <p>Moves:</p> <select id="movesPokemon"> </select>
    
       <p>Hidden ability: ${res.abilities[0].ability.name}</p>
       <p>Hidden ability: ${res.abilities[1].ability.name}</p>
  
       <h5>Team Pokemon</h5><br>
        <div class="row" id="TeamPokemon">
          <div class="col-6">
            <button class="bg-water" id="TeamOne"> TEAM ONE </button>
          </div>

          
              <div class="col-6">
                  <button class="bg-fire" id="TeamTwo"> TEAM TWO </button>
              </div>
          </div>
         </section>
      </div>
    </div>`;
    typePokemon(res.types, action);
    movesPokemon(res.moves);
  } else if (action === "getAllPokemonForType") {
    console.log("action",action);

    let x = document.getElementById("resultType");

    x.innerHTML += `
    
    <div class="col-md-4 col-sm-12 mt-4 h-200">
  <div class="card" >
    <img src="${res.sprites.front_default}" class="card-img-top img-fluid" style="max-width:250px" alt="...">
    <div class="card-body">
      <h5 class="card-title">${res.name}</h5>
      <p class="card-text">Types:</p>
      <div id="TypePokemon2${index}" ></div>
      <p class="card-text">Peso:${res.weight}</p>
      <p class="card-text">Altura:${res.height}</p>
      
        </div>
      </div>

  </div>`;
    typePokemon(res.types, action, index);
    
  }
}

function showError(error) {
  document.getElementById("infoPokemon").innerHTML = `
  <div id="infoPokemonHidden">
    <h5>No hemos podido encontrar el Pokemon que buscas, inténtelo con otro nombre o id.</h5>
    </div>`;
  // console.log("error", error);
}

function typePokemon(types, action, index) {
  types;
  console.log("types", types);
  if (action === "searchOnePokemon") {
    let y = document.getElementById("infoType");
    if (types.length > 1) {
      for (let i = 0; i < types.length; i++) {
        y.innerHTML += `
        <p>${types[i].type.name}</p>`;
      }
    }
  } else if (action === "getAllPokemonForType") {
    let y = document.getElementById(`TypePokemon2${index}`);

    for (let i = 0; i < types.length; i++) {
      y.innerHTML += `
        <p>${types[i].type.name}</p>`;
    }
  }
}

function movesPokemon(moves) {
  let x = document.getElementById("movesPokemon");
  for (let i = 0; i < moves.length; i++) {
    x.innerHTML += `
            <option>${moves[i].move.name}</option>`;
  }
}

// PART OF TYPES POKEMON


function typePokemonList(results) {
  let x = document.getElementById("typesPokemon");
  
  if (results.length > 1) {
    for (let i = 0; i < results.length; i++) {
      x.innerHTML += `
            <option value='${results[i].name}'>${results[i].name}</option>`;
    }
  } else {
    x.innerHTML += `
    <option value='${results[0].name}'>${results[0].name}</option>`;
  }

  let selectTypePokemon = document.getElementById("typesPokemon");
  let w = document.getElementById("resultType");
  selectTypePokemon.addEventListener("change", (e) => {
    w.innerHTML = "";
    optionAxios("searchAllTypePokemon", selectTypePokemon.value, null);
    console.log("searchAllTypePokemon", selectTypePokemon.value);
  });
}

function typePokemonResult(pokemon) {
  console.log("pokemon", pokemon);
  const a = document.getElementById("loader");

  if (a.classList.contains("hidden")) {
    a.classList.remove("hidden");

    a.classList.add("visible");
  }

  for (i = 0; i <= pokemon.length; i++) {

    if (i == pokemon.length) {
      setTimeout(() => {
        a.classList.remove("visible");
        a.classList.add("hidden");
      }, 2500);
    }

    if (pokemon != undefined || pokemon != null) {
      console.log("pokemon", pokemon);
      optionAxios("getAllPokemonForType", pokemon[i].pokemon.url, i);
    }
    // console.log("NAME", pokemon[i].pokemon.name)
  }
}

getAllTypePokemon = () => {
  optionAxios("searchAllType", null, null);
};

getAllTypePokemon();





