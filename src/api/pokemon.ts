import type { Pokemon, PokemonShort } from '../types_interfaces/interfaces';

const apiLink = 'https://pokeapi.co/api/v2';

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${apiLink}/pokemon/${name}`);
  if (!response.ok)
    throw new Error(`Pokémon "${name}" not found. Status: ${response.status}`);
  return response.json();
}
export async function fetchPokemonsPage(
  page: number,
  limit = 20
): Promise<Pokemon[]> {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `${apiLink}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok)
    throw new Error(`Failed to fetch list. Status: ${response.status}`);
  const data: { results: PokemonShort[] } = await response.json();
  return Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      if (!response.ok)
        throw new Error(
          `Failed to fetch Pokémon details. Status: ${response.status}`
        );
      return response.json();
    })
  );
}
