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
    // getPokemonByPage: build.query<Pokemon[], { page: number; limit?: 20 }>({
    //   query: ()
    // }),
  }),
});

//   Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
