"use client";
// @ts-nocheck
import { useClientData } from "./useClientData";

export default function Home() {
  const { pokemon, encounters, otherPokemon } = useClientData();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <h1 className="text-5xl font-bold">{pokemon?.name}</h1>
      <strong className="text-xl">Can be found at:</strong>
      {encounters?.map((encounter) => (
        <li key={encounter.location_area.name}>
          <strong>{encounter.location_area.name}</strong>
          <p>{otherPokemon?.[encounter.location_area.name]}</p>
        </li>
      ))}
    </main>
  );
}
