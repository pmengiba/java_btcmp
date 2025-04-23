let pkms = [];
let vanillaList = [];
const detailsCache = {};
let latestRenderId = 0;


async function fetchPkmData() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response status: ", response.status);
    }

    const json = await response.json();
    //console.log("JSON GENERADO");
    //console.log(json);
    //console.log("BULBASAUR", json.results[0]);
    return json.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function getPkmDetails(url) {
  if (detailsCache[url]) {
    return detailsCache[url];
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    detailsCache[url] = data;
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}


async function getPkmEvo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener la cadena de evolución: ${response.status}`);
    }
    const evolutionData = await response.json();
    const evolutions = [];
    let current = evolutionData.chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  } catch (error) {
    console.error("Error al obtener evoluciones:", error.message);
    return [];
  }
}

function renderPkmData(details, preEvolutionName = null) {
  const container = document.getElementById("pkm-container");

  const pkmCard = `
    <div class="card">
      <div class="card-img">
        <img src="${details.sprites.front_default}" alt="${details.name}" loading="lazy" />
        <span>#${details.id.toString().padStart(3, "0")}</span>
      </div>
      <div class="card-info">
        <h1 class="pkm-name">${details.name}</h1>
        <div class="pkm-type">
          ${details.types.map(t => `<p>${t.type.name}</p>`).join('')}
        </div>
        ${preEvolutionName ? `
        <div class="pkm-evo">
          <p>Evolucionada de:</p>
          <p>${preEvolutionName}</p>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  container.innerHTML += pkmCard;
}

async function getPkmData() {
  pkms = await fetchPkmData();
  vanillaList = [...pkms];
  if (pkms.length > 0) {
    for (const pkm of pkms) {
      const details = await getPkmDetails(pkm.url);
      if (details) {
        const speciesData = await getPkmDetails(details.species.url);
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutions = await getPkmEvo(evolutionChainUrl);
        const currentIndex = evolutions.indexOf(pkm.name);
        const preEvolutionName = currentIndex > 0 ? evolutions[currentIndex - 1] : null;

        //console.log("---------------------------")
        //console.log("details: ",details);
        //console.log("prevolution: ", preEvolutionName);
        //console.log("---------------------------")

        renderPkmData(details, preEvolutionName);

      }
    }
  } else {
    console.log("error on getPkmData");
  }
}

//bonus
const searchInput = document.getElementById('pkm-search');

searchInput.addEventListener('input', async function () {
  const name = searchInput.value.toLowerCase();
  const container = document.getElementById("pkm-container");
  container.innerHTML = "";
  const currentRenderId = ++latestRenderId;
  const source = name ? pkms.filter(pkm => pkm.name.toLowerCase().includes(name)) : vanillaList;
  console.log("Source, ", source);

  const promises = source.map(async (pkm) => {
    const details = await getPkmDetails(pkm.url);
    if (details) {
      const speciesData = await getPkmDetails(details.species.url);
      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutions = await getPkmEvo(evolutionChainUrl);
      const currentIndex = evolutions.indexOf(pkm.name);
      const preEvolutionName = currentIndex > 0 ? evolutions[currentIndex - 1] : null;

      return { details, preEvolutionName };
    }
    return null;
  });

  const results = await Promise.all(promises);
  if (currentRenderId !== latestRenderId) return;
  console.log("RESULT, ", results);

  results.forEach(result =>{
    if(result){
      renderPkmData(result.details, result.preEvolutionName);
    }
  })
});

getPkmData();
