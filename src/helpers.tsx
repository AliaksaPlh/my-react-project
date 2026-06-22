import type {
  Pokemon,
  ApiParamsByPage,
  GetPokemonByPage,
} from './types_interfaces/interfaces';

export function isPokemonsList(
  data: GetPokemonByPage | undefined
): data is ApiParamsByPage<Pokemon> {
  if (!data) return false;
  return !!data && Array.isArray((data as ApiParamsByPage<Pokemon>).results);
}
