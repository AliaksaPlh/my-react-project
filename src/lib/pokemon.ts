import type {
  ApiParamsByPage,
  Pokemon,
  PokemonShort,
} from '../types_interfaces/interfaces';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${API_URL}/${name}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pokemon "${name}" not found`);
  }

  return response.json();
}

export async function fetchPokemonPage(
  page: number,
  limit = 20
): Promise<ApiParamsByPage<PokemonShort>> {
  const offset = (page - 1) * limit;
  const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pokemon page "${page}" not found`);
  }

  return response.json();
}

export async function fetchPokemonDetailsPage(
  page: number
): Promise<Pokemon[]> {
  const data = await fetchPokemonPage(page);

  return Promise.all(
    data.results.map((pokemon) => fetchPokemonByName(pokemon.name))
  );
}
