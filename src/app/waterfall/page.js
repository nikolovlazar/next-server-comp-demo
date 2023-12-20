// @ts-nocheck

async function fetchFromApi(url) {
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

async function fetchData() {
  const pokemon = await fetchFromApi(
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  );
  const encounters = await fetchFromApi(
    "https://pokeapi.co/api/v2/pokemon/pikachu/encounters",
  );

  const otherPokemon = {};
  for (let encounter of encounters) {
    const loc = await fetchFromApi(encounter.location_area.url);
    const pokemonAtLocation = loc.pokemon_encounters
      .filter((e) => e.pokemon.name !== "pikachu")
      .map((e) => e.pokemon.name)
      .join(", ");
    otherPokemon[encounter.location_area.name] = pokemonAtLocation;
  }

  return { pokemon, encounters, otherPokemon };
}

export default async function Home() {
  const { pokemon, encounters, otherPokemon } = await fetchData();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <h1 className="text-5xl font-bold">{pokemon.name}</h1>
      <strong className="text-xl">Can be found at:</strong>
      {encounters.map((encounter) => (
        <li key={encounter.location_area.name}>
          <strong>{encounter.location_area.name}</strong>
          <p>{otherPokemon[encounter.location_area.name]}</p>
        </li>
      ))}
    </main>
  );
}
