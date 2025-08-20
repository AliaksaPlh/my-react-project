import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon } from '../../types_interfaces/interfaces';

const apiURL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['Pokemon', 'PokemonList'],
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonByPageQuery } =
  pokemonApi;
