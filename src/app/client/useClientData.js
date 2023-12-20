"use client";
import { useEffect, useState } from "react";

export const useClientData = () => {
  const [pokemon, setPokemon] = useState();
  const [encounters, setEncounters] = useState();
  const [otherPokemon, setOtherPokemon] = useState();

  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then((res) => res.json())
        .then(setPokemon);
      fetch("https://pokeapi.co/api/v2/pokemon/pikachu/encounters")
        .then((res) => res.json())
        .then(async (data) => {
          setEncounters(data);

          const other = {};
          await Promise.all(
            data.map((encounter) =>
              fetch(encounter.location_area.url)
                .then((res) => res.json())
                .then((loc) => {
                  const pokemonAtLocation = loc.pokemon_encounters
                    .filter((e) => e.pokemon.name !== "pikachu")
                    .map((e) => e.pokemon.name)
                    .join(", ");
                  other[encounter.location_area.name] = pokemonAtLocation;
                }),
            ),
          );
          setOtherPokemon(other);
        });
    };

    if (!pokemon && !encounters && !otherPokemon) {
      fetchData();
    }
  }, []);

  return { pokemon, encounters, otherPokemon };
};
